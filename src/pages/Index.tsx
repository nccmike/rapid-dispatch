
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import IncidentForm from '@/components/IncidentForm';
import AdjusterResults, { Adjuster } from '@/components/AdjusterResults';
import { toast } from 'sonner';

// This would normally come from your Supabase database
const mockAdjusters: Adjuster[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '(555) 123-4567',
    distance: 15,
    response: 'available',
    eta: 25,
    responseTime: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '(555) 234-5678',
    distance: 8,
    response: 'available',
    eta: 15,
    responseTime: '5 minutes ago'
  },
  {
    id: '3',
    name: 'Michael Davis',
    phone: '(555) 345-6789',
    distance: 22,
    response: null,
    eta: null,
    responseTime: null
  },
  {
    id: '4',
    name: 'Jessica Williams',
    phone: '(555) 456-7890',
    distance: 35,
    response: 'unavailable',
    eta: null,
    responseTime: '1 minute ago'
  },
  {
    id: '5',
    name: 'Robert Brown',
    phone: '(555) 567-8901',
    distance: 12,
    response: null,
    eta: null,
    responseTime: null
  }
];

const Index = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [adjusters, setAdjusters] = useState<Adjuster[]>([]);
  
  const handleFormSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    
    // In a real app, this would make an API call to Supabase
    // to fetch adjusters within 100 miles of the loss location
    // and send SMS/voice calls to them
    
    setTimeout(() => {
      // Simulate receiving adjuster data from backend
      setAdjusters(mockAdjusters);
      setFormSubmitted(true);
    }, 1500);
  };
  
  const handleSelectAdjuster = (adjusterId: string) => {
    console.log('Selected adjuster:', adjusterId);
    
    // In a real app, this would make an API call to Supabase
    // to assign the selected adjuster to the incident
    
    toast.success('Adjuster assigned successfully!');
    
    // Simulate updating the adjusters list to show the assigned adjuster
    setAdjusters(prev => 
      prev.map(adj => 
        adj.id === adjusterId 
          ? { ...adj, assigned: true }
          : adj
      )
    );
  };
  
  // Simulate adjusters responding over time
  React.useEffect(() => {
    if (formSubmitted) {
      // Simulate an adjuster responding after 3 seconds
      const timer1 = setTimeout(() => {
        setAdjusters(prev => 
          prev.map(adj => 
            adj.id === '3' 
              ? { ...adj, response: 'available', eta: 30, responseTime: 'just now' }
              : adj
          )
        );
        toast.info('New adjuster response received');
      }, 3000);
      
      // Simulate another adjuster responding after 5 seconds
      const timer2 = setTimeout(() => {
        setAdjusters(prev => 
          prev.map(adj => 
            adj.id === '5' 
              ? { ...adj, response: 'available', eta: 20, responseTime: 'just now' }
              : adj
          )
        );
        toast.info('New adjuster response received');
      }, 5000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [formSubmitted]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2 text-center">Emergency Response Coordination</h1>
        <p className="text-center text-gray-600 mb-8">Fill out the incident details to notify adjusters in the area</p>
        
        <IncidentForm onSubmit={handleFormSubmit} />
        
        {formSubmitted && (
          <AdjusterResults 
            adjusters={adjusters} 
            onSelectAdjuster={handleSelectAdjuster} 
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
