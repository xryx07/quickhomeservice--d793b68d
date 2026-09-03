-- 1. Booking status history
CREATE TABLE public.booking_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  status text NOT NULL,
  note text,
  changed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.booking_status_history TO authenticated;
GRANT ALL ON public.booking_status_history TO service_role;

ALTER TABLE public.booking_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Booking parties can view status history"
ON public.booking_status_history FOR SELECT TO authenticated
USING (EXISTS (
  SELECT 1 FROM public.bookings b
  WHERE b.id = booking_id AND (b.customer_id = auth.uid() OR b.provider_id = auth.uid())
));

CREATE POLICY "Booking parties can add status history"
ON public.booking_status_history FOR INSERT TO authenticated
WITH CHECK (EXISTS (
  SELECT 1 FROM public.bookings b
  WHERE b.id = booking_id AND (b.customer_id = auth.uid() OR b.provider_id = auth.uid())
));

CREATE INDEX idx_booking_status_history_booking ON public.booking_status_history(booking_id, created_at);

-- 2. Booking extras
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS eta_minutes integer,
  ADD COLUMN IF NOT EXISTS cancellation_reason text,
  ADD COLUMN IF NOT EXISTS cancelled_at timestamptz,
  ADD COLUMN IF NOT EXISTS reschedule_reason text,
  ADD COLUMN IF NOT EXISTS reschedule_count integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS discount_amount numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS coupon_code text,
  ADD COLUMN IF NOT EXISTS refund_amount numeric NOT NULL DEFAULT 0;

-- 3. Coupons
CREATE TABLE public.coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  discount_type text NOT NULL DEFAULT 'percent',
  discount_value numeric NOT NULL DEFAULT 0,
  min_order_value numeric NOT NULL DEFAULT 0,
  max_discount numeric,
  expires_at timestamptz,
  usage_limit integer,
  times_used integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.coupons TO anon, authenticated;
GRANT ALL ON public.coupons TO service_role;

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active coupons are viewable by everyone"
ON public.coupons FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage coupons"
ON public.coupons FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_coupons_updated_at
BEFORE UPDATE ON public.coupons
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Coupon redemptions
CREATE TABLE public.coupon_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  booking_id uuid REFERENCES public.bookings(id) ON DELETE SET NULL,
  discount_amount numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.coupon_redemptions TO authenticated;
GRANT ALL ON public.coupon_redemptions TO service_role;

ALTER TABLE public.coupon_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own redemptions"
ON public.coupon_redemptions FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own redemptions"
ON public.coupon_redemptions FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 5. Saved addresses (address book)
CREATE TABLE public.user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  label text NOT NULL DEFAULT 'home',
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip_code text NOT NULL,
  landmark text,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_addresses TO authenticated;
GRANT ALL ON public.user_addresses TO service_role;

ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own saved addresses"
ON public.user_addresses FOR ALL TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE TRIGGER update_user_addresses_updated_at
BEFORE UPDATE ON public.user_addresses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 6. Trust / badge flags
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS background_verified boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS completed_jobs integer NOT NULL DEFAULT 0;

ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS eco_friendly boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS city text;