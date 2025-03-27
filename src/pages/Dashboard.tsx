
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Calendar, MapPin, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Operations Dashboard</h1>
            <p className="text-gray-600">Monitor active incidents and adjuster responses</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Calendar className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card animate-slide-up shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Active Incidents
              </CardTitle>
              <CardDescription>Currently active cases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7</div>
              <div className="text-sm text-gray-500 mt-1">3 awaiting adjuster</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-slide-up shadow [animation-delay:150ms]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Phone className="mr-2 h-4 w-4 text-blue-500" />
                Calls Made Today
              </CardTitle>
              <CardDescription>Voice calls to adjusters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">23</div>
              <div className="text-sm text-gray-500 mt-1">15 successful connections</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card animate-slide-up shadow [animation-delay:300ms]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-indigo-500" />
                SMS Sent Today
              </CardTitle>
              <CardDescription>Text messages to adjusters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">42</div>
              <div className="text-sm text-gray-500 mt-1">38 delivered</div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Incidents</h2>
        
        <div className="space-y-4 appear-animation">
          <Card className="glass-card shadow">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-green-500">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">Vehicle Collision - Highway 101</h3>
                    <div className="text-sm text-gray-500 mt-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> San Francisco, CA
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Adjuster Assigned
                      </span>
                      <span className="text-xs text-gray-500">
                        2 hours ago
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <Link to="/incidents/1">
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card shadow">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-yellow-500">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">Property Damage - Fallen Tree</h3>
                    <div className="text-sm text-gray-500 mt-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> Portland, OR
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Waiting for responses
                      </span>
                      <span className="text-xs text-gray-500">
                        30 minutes ago
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <Link to="/incidents/2">
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card shadow">
            <CardContent className="p-0">
              <div className="p-4 border-l-4 border-red-500">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="font-medium">Water Damage - Office Building</h3>
                    <div className="text-sm text-gray-500 mt-1 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" /> Seattle, WA
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" /> Urgent - No responses
                      </span>
                      <span className="text-xs text-gray-500">
                        15 minutes ago
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <Link to="/incidents/3">
                      <Button variant="outline" size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
