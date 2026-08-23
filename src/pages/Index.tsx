
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PaintBucket, Palette, PaintRoller, Check, Wrench, Monitor, Cpu } from 'lucide-react';

import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Service, Category } from '@/utils/types';
import { allCategories } from '@/data/services';
import { paintingServices } from '@/data/services/painting';
import ChatBot from '@/components/chatbot';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <Hero />
      
      <main>
        {/* Browse Categories */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {allCategories.map((category) => (
                <Link key={category.id} to={`/services?category=${category.name.toLowerCase()}`}>
                  <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 text-center">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                      <div className="text-4xl mb-3">{category.icon}</div>
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.services} services</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* We perform works of varying levels of complexity */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">We perform works of varying levels of complexity</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From simple fixes to complex system overhauls, our team has the expertise to handle any repair job.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-black mb-4">
                    <Monitor size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Computer repair services</h3>
                  <p className="text-gray-600">
                    We fix all types of computer issues from hardware replacements to software troubleshooting.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Hardware diagnostics
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Software installations
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Battery replacement
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-black mb-4">
                    <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Electronics repair</h3>
                  <p className="text-gray-600">
                    Expert repair services for phones, tablets, TVs, and other electronic devices.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Screen replacement
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Data recovery
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Component-level repair
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-black mb-4">
                    <Wrench size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Appliance repair</h3>
                  <p className="text-gray-600">
                    Reliable repair services for all major household appliances and systems.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Refrigerator repair
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      Washer & dryer service
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <Check size={16} className="text-green-500 mr-2" />
                      HVAC maintenance
                    </li>
                  </ul>
                  <Button variant="outline" className="mt-6 w-full">Get Started</Button>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link to="/services">
                <Button className="bg-black hover:bg-gray-800 text-white">View All Services</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Request Service</h3>
                <p className="text-muted-foreground">
                  Search for the service you need and submit a request through our platform.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get a Quote</h3>
                <p className="text-muted-foreground">
                  Receive a transparent quote with no hidden fees before any work begins.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Problem Solved</h3>
                <p className="text-muted-foreground">
                  Our qualified technician arrives at your location and completes the repair.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Join as Provider CTA */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Join Our Network of Service Providers</h2>
              <p className="text-xl mb-8">
                Are you a qualified technician or service provider? Partner with us to grow your business and reach more customers.
              </p>
              <Link to="/become-provider">
                <Button variant="outline" className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-lg px-6 py-2 font-medium">
                  Become a Provider
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <ChatBot />
      <Footer />
    </div>
  );
};

export default Index;
