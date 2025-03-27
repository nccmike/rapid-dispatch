
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { 
  Phone, 
  MessageSquare, 
  ArrowLeft, 
  Clock, 
  MapPin, 
  User, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  BarChart4
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Adjuster } from '@/components/AdjusterResults';

// Mock data for the incident details
interface Message {
  id: string;
  type: 'sms' | 'call';
  status: 'sent' | 'delivered' | 'failed' | 'no-answer';
  timestamp: string;
  adjusterName: string;
  adjusterPhone: string;
  content?: string;
  duration?: number;
}

interface Incident {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  status: 'active' | 'closed' | 'pending';
  description: string;
  customerName: string;
  callerName: string;
  callerNumber: string;
  driverName: string;
  driverNumber: string;
  assignedAdjuster: Adjuster | null;
}

const IncidentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [incident, setIncident] = useState<Incident | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [adjusters, setAdjusters] = useState<Adjuster[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from Supabase
    const fetchIncidentDetails = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        const mockIncident: Incident = {
          id: id || '1',
          title: id === '2' ? 'Property Damage - Fallen Tree' : 'Vehicle Collision - Highway 101',
          location: id === '2' ? 'Portland, OR' : 'San Francisco, CA',
          timestamp: new Date(Date.now() - (id === '2' ? 30 * 60000 : 120 * 60000)).toISOString(),
          status: id === '2' ? 'active' : 'active',
          description: id === '2' 
            ? 'Large oak tree fell on garage roof during storm. Homeowner reports partial roof collapse and water damage.'
            : 'Two-car collision on Highway 101 northbound. One vehicle with moderate front-end damage, second vehicle with driver-side impact.',
          customerName: id === '2' ? 'Emily Johnson' : 'Michael Rodriguez',
          callerName: id === '2' ? 'Emily Johnson' : 'Officer Pete Wilson',
          callerNumber: id === '2' ? '503-555-0189' : '415-555-0142',
          driverName: id === '2' ? 'N/A' : 'Sarah Chen',
          driverNumber: id === '2' ? 'N/A' : '415-555-0178',
          assignedAdjuster: id === '2' ? null : {
            id: 'adj-001',
            name: 'David Miller',
            phone: '415-555-0122',
            distance: 3.2,
            response: 'available',
            eta: 15,
            responseTime: '8 minutes ago'
          }
        };
        
        const mockMessages: Message[] = [];
        const adjustersCount = id === '2' ? 4 : 5;
        
        const mockAdjusters: Adjuster[] = [];
        
        // Generate mock adjusters and their messages
        for (let i = 1; i <= adjustersCount; i++) {
          const adjusterId = `adj-00${i}`;
          const adjusterName = [
            'David Miller', 
            'Jessica Thompson', 
            'Marcus Williams', 
            'Sophia Rodriguez', 
            'James Chen'
          ][i-1];
          
          const phone = `${id === '2' ? '503' : '415'}-555-01${i+20}`;
          const distance = Math.round((Math.random() * 15 + 2) * 10) / 10;
          
          // For incident 1 (Vehicle collision), first adjuster is available and assigned
          // For incident 2 (Property damage), adjusters are in various states
          const adjusterResponse: 'available' | 'unavailable' | null = 
            (id !== '2') ? 
              (i === 1 ? 'available' : (i === 2 ? 'available' : (i === 3 ? 'unavailable' : null))) :
              (i === 1 ? 'available' : (i === 2 ? 'unavailable' : null));
          
          const responseTimeAgo = Math.round(Math.random() * 10 + 2);
          
          const adjuster: Adjuster = {
            id: adjusterId,
            name: adjusterName,
            phone,
            distance,
            response: adjusterResponse,
            eta: adjusterResponse === 'available' ? Math.round(distance * 3) : null,
            responseTime: adjusterResponse !== null ? `${responseTimeAgo} minutes ago` : null
          };
          
          mockAdjusters.push(adjuster);
          
          // Generate SMS message
          mockMessages.push({
            id: `sms-${adjusterId}`,
            type: 'sms',
            status: adjusterResponse === null ? 'sent' : 'delivered',
            timestamp: new Date(Date.now() - (Math.random() * 40 + 5) * 60000).toISOString(),
            adjusterName,
            adjusterPhone: phone,
            content: `Incident alert: ${mockIncident.title} at ${mockIncident.location}. Are you available to respond?`
          });
          
          // Generate call data
          mockMessages.push({
            id: `call-${adjusterId}`,
            type: 'call',
            status: adjusterResponse === null ? 'no-answer' : 'sent',
            timestamp: new Date(Date.now() - (Math.random() * 35 + 10) * 60000).toISOString(),
            adjusterName,
            adjusterPhone: phone,
            duration: adjusterResponse === null ? 0 : Math.round(Math.random() * 120 + 30)
          });
          
          // Add response messages for adjusters who responded
          if (adjusterResponse !== null) {
            mockMessages.push({
              id: `response-${adjusterId}`,
              type: 'sms',
              status: 'delivered',
              timestamp: new Date(Date.now() - responseTimeAgo * 60000).toISOString(),
              adjusterName,
              adjusterPhone: phone,
              content: adjusterResponse === 'available' 
                ? `I am available and can be on site in approximately ${adjuster.eta} minutes.`
                : 'I am currently unavailable to respond to this incident.'
            });
          }
        }
        
        setIncident(mockIncident);
        setMessages(mockMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
        setAdjusters(mockAdjusters);
      } catch (error) {
        console.error('Error fetching incident details:', error);
        toast.error('Failed to load incident details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchIncidentDetails();
  }, [id]);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'no-answer':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Clock className="h-3 w-3 mr-1" />;
      case 'delivered':
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case 'failed':
        return <XCircle className="h-3 w-3 mr-1" />;
      case 'no-answer':
        return <AlertCircle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!incident) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">Incident not found</h1>
            <p className="mt-2 text-gray-600">The incident you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate metrics
  const totalMessages = messages.length;
  const smsMessages = messages.filter(m => m.type === 'sms').length;
  const calls = messages.filter(m => m.type === 'call').length;
  const respondedAdjusters = adjusters.filter(a => a.response !== null).length;
  const pendingAdjusters = adjusters.filter(a => a.response === null).length;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">{incident.title}</h1>
            <div className="mt-2 md:mt-0">
              <Badge className={`px-3 py-1 ${incident.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {incident.status === 'active' ? 'Active Incident' : 'Pending Resolution'}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 mb-6">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{incident.location}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDateTime(incident.timestamp)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-1 lg:col-span-2 glass-card animate-slide-up shadow">
            <CardHeader>
              <CardTitle>Incident Details</CardTitle>
              <CardDescription>Information about the incident and parties involved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Customer/Client</h3>
                  <p className="font-medium">{incident.customerName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Caller Info</h3>
                  <p className="font-medium">{incident.callerName}</p>
                  <p className="text-sm text-gray-600">{incident.callerNumber}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Driver Info</h3>
                  <p className="font-medium">{incident.driverName}</p>
                  <p className="text-sm text-gray-600">{incident.driverNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="font-medium">{incident.location}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-md">{incident.description}</p>
              </div>
              
              {incident.assignedAdjuster && (
                <div className="bg-green-50 border border-green-100 rounded-md p-4">
                  <h3 className="text-sm font-medium text-green-800 flex items-center mb-2">
                    <CheckCircle className="h-4 w-4 mr-1 text-green-600" /> 
                    Assigned Adjuster
                  </h3>
                  <div className="flex items-center">
                    <div className="bg-green-100 text-green-800 p-2 rounded-full mr-3">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{incident.assignedAdjuster.name}</p>
                      <p className="text-sm text-gray-600">{incident.assignedAdjuster.phone}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
                          <MapPin className="h-3 w-3 mr-1" /> {incident.assignedAdjuster.distance} miles
                        </span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {incident.assignedAdjuster.eta} min ETA
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-slide-up shadow">
            <CardHeader>
              <CardTitle>Communication Summary</CardTitle>
              <CardDescription>Status of outreach efforts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-800 p-2 rounded-full mr-3">
                    <BarChart4 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Messages</p>
                    <p className="text-xl font-semibold">{totalMessages}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-indigo-100 text-indigo-800 p-2 rounded-full mr-3">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">SMS Messages</p>
                    <p className="text-xl font-semibold">{smsMessages}</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Calls</p>
                    <p className="text-xl font-semibold">{calls}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Adjuster Responses</p>
                    <p className="text-sm font-medium">{respondedAdjusters}/{adjusters.length}</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(respondedAdjusters / adjusters.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>{respondedAdjusters} responded</span>
                    <span>{pendingAdjusters} pending</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card className="glass-card animate-slide-up shadow mb-8">
          <CardHeader>
            <CardTitle>Adjuster Responses</CardTitle>
            <CardDescription>Status of all adjusters contacted for this incident</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Adjuster</TableHead>
                    <TableHead>Distance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>ETA</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {adjusters.map((adjuster) => (
                    <TableRow key={adjuster.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{adjuster.name}</div>
                          <div className="text-sm text-gray-500">{adjuster.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>{adjuster.distance} miles</TableCell>
                      <TableCell>
                        {adjuster.response === 'available' ? (
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                        ) : adjuster.response === 'unavailable' ? (
                          <Badge className="bg-gray-100 text-gray-800">Unavailable</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 animate-pulse">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell>{adjuster.responseTime || '-'}</TableCell>
                      <TableCell>{adjuster.eta ? `${adjuster.eta} minutes` : '-'}</TableCell>
                      <TableCell className="text-right">
                        {incident.assignedAdjuster?.id === adjuster.id ? (
                          <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
                        ) : adjuster.response === 'available' ? (
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                            Assign
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" disabled={true} className="opacity-50">
                            Assign
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card animate-slide-up shadow">
          <CardHeader>
            <CardTitle>Communication Log</CardTitle>
            <CardDescription>History of all messages and calls for this incident</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      {message.type === 'sms' ? (
                        <div className="bg-indigo-100 text-indigo-800 p-2 rounded-full mr-3">
                          <MessageSquare className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="bg-purple-100 text-purple-800 p-2 rounded-full mr-3">
                          <Phone className="h-4 w-4" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{message.adjusterName}</p>
                        <p className="text-sm text-gray-500">{message.adjusterPhone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{formatDateTime(message.timestamp)}</p>
                      <span className={`text-xs inline-flex items-center px-2 py-0.5 rounded-full mt-1 ${getStatusBadgeColor(message.status)}`}>
                        {getStatusIcon(message.status)}
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  {message.type === 'sms' && message.content && (
                    <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm ml-11">
                      {message.content}
                    </div>
                  )}
                  
                  {message.type === 'call' && (
                    <div className="ml-11 text-sm text-gray-600">
                      {message.status === 'no-answer' ? (
                        <p>Call was not answered</p>
                      ) : (
                        <p>Call duration: {Math.floor(message.duration! / 60)}:{(message.duration! % 60).toString().padStart(2, '0')}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default IncidentDetails;
