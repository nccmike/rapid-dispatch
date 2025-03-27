
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Calendar, Download, Filter, MapPin, MessageSquare, Phone } from 'lucide-react';

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock historical data - in a real app, this would come from Supabase
  const incidents = [
    {
      id: '1',
      date: '2023-10-15',
      customerName: 'Acme Corp',
      location: 'Los Angeles, CA',
      description: 'Vehicle collision on highway',
      adjusterId: 'ADJ-1023',
      adjusterName: 'John Smith',
      textsSent: 8,
      callsMade: 5,
      responses: 3,
      status: 'completed'
    },
    {
      id: '2',
      date: '2023-10-12',
      customerName: 'TechStart Inc',
      location: 'San Francisco, CA',
      description: 'Water damage in office',
      adjusterId: 'ADJ-985',
      adjusterName: 'Sarah Johnson',
      textsSent: 5,
      callsMade: 4,
      responses: 2,
      status: 'completed'
    },
    {
      id: '3',
      date: '2023-10-10',
      customerName: 'Global Logistics',
      location: 'Seattle, WA',
      description: 'Truck accident - cargo damage',
      adjusterId: 'ADJ-1045',
      adjusterName: 'Michael Davis',
      textsSent: 10,
      callsMade: 7,
      responses: 4,
      status: 'completed'
    },
    {
      id: '4',
      date: '2023-10-08',
      customerName: 'Retail Solutions',
      location: 'Portland, OR',
      description: 'Storm damage to retail location',
      adjusterId: 'ADJ-876',
      adjusterName: 'Jessica Williams',
      textsSent: 6,
      callsMade: 5,
      responses: 3,
      status: 'completed'
    },
    {
      id: '5',
      date: '2023-10-05',
      customerName: 'City Hospital',
      location: 'Denver, CO',
      description: 'Plumbing failure - water damage',
      adjusterId: 'ADJ-1102',
      adjusterName: 'Robert Brown',
      textsSent: 12,
      callsMade: 8,
      responses: 6,
      status: 'completed'
    }
  ];
  
  const filteredIncidents = searchTerm 
    ? incidents.filter(incident => 
        incident.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.adjusterName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : incidents;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Incident History</h1>
            <p className="text-gray-600">View and search past incidents and responses</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <Card className="glass-card shadow mb-6 animate-slide-up">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Search History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by client, location, or adjuster..."
                className="pl-10 glass-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card shadow overflow-hidden animate-slide-up [animation-delay:150ms]">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Past Incidents</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead>Date</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Adjuster</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Texts
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        Calls
                      </div>
                    </TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id} className="hover:bg-gray-50/70 transition-colors">
                      <TableCell>{incident.date}</TableCell>
                      <TableCell className="font-medium">{incident.customerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                          {incident.location}
                        </div>
                      </TableCell>
                      <TableCell>{incident.description}</TableCell>
                      <TableCell>{incident.adjusterName}</TableCell>
                      <TableCell>{incident.textsSent}</TableCell>
                      <TableCell>{incident.callsMade}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
