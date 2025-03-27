
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, MapPin, Phone, MessageSquare, User } from "lucide-react";
import { toast } from "sonner";

export interface Adjuster {
  id: string;
  name: string;
  phone: string;
  distance: number;
  response: 'available' | 'unavailable' | null;
  eta: number | null;
  responseTime: string | null;
}

interface AdjusterResultsProps {
  adjusters: Adjuster[];
  onSelectAdjuster: (adjusterId: string) => void;
}

const AdjusterResults: React.FC<AdjusterResultsProps> = ({ adjusters, onSelectAdjuster }) => {
  const [selectedAdjuster, setSelectedAdjuster] = useState<string | null>(null);
  const [isAssigning, setIsAssigning] = useState(false);

  const handleAssignAdjuster = async (id: string) => {
    setSelectedAdjuster(id);
    setIsAssigning(true);
    
    try {
      // In a real app, this would send the assignment to the API
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network request
      onSelectAdjuster(id);
      toast.success("Adjuster assigned successfully!");
    } catch (error) {
      console.error("Error assigning adjuster:", error);
      toast.error("Failed to assign adjuster. Please try again.");
    } finally {
      setIsAssigning(false);
    }
  };

  if (adjusters.length === 0) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8 shadow-md glass-card animate-fade-in">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl flex items-center gap-2">
            <User className="h-5 w-5" /> Available Adjusters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium">No adjusters available</p>
            <p className="text-sm mt-1">Waiting for adjuster responses...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const availableAdjusters = adjusters.filter(a => a.response === 'available');
  const pendingAdjusters = adjusters.filter(a => a.response === null);
  const unavailableAdjusters = adjusters.filter(a => a.response === 'unavailable');

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 shadow-md glass-card animate-fade-in">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-5 w-5" /> Available Adjusters
        </CardTitle>
      </CardHeader>
      <CardContent className="appear-animation">
        <div className="space-y-4">
          {availableAdjusters.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-green-600 mb-2 flex items-center">
                <Check className="h-4 w-4 mr-1" /> Available ({availableAdjusters.length})
              </h3>
              <div className="space-y-3">
                {availableAdjusters.map((adjuster) => (
                  <div 
                    key={adjuster.id} 
                    className={`p-4 rounded-lg border transition-all ${
                      selectedAdjuster === adjuster.id
                        ? 'border-blue-500 bg-blue-50/50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-medium">{adjuster.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" /> {adjuster.phone}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {adjuster.distance} miles
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> {adjuster.eta} min ETA
                          </span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleAssignAdjuster(adjuster.id)}
                        disabled={isAssigning && selectedAdjuster === adjuster.id}
                        className="bg-blue-500 hover:bg-blue-600 transition-all"
                      >
                        {isAssigning && selectedAdjuster === adjuster.id ? (
                          <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Assigning...
                          </>
                        ) : "Assign Adjuster"}
                      </Button>
                    </div>
                    {adjuster.responseTime && (
                      <div className="mt-2 text-xs text-gray-500">
                        Responded {adjuster.responseTime}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {pendingAdjusters.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-yellow-600 mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> Waiting for Response ({pendingAdjusters.length})
              </h3>
              <div className="space-y-3">
                {pendingAdjusters.map((adjuster) => (
                  <div key={adjuster.id} className="p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{adjuster.name}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" /> {adjuster.phone}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {adjuster.distance} miles
                          </span>
                        </div>
                      </div>
                      <div className="animate-pulse flex items-center">
                        <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                          <MessageSquare className="h-4 w-4 text-yellow-500" />
                        </div>
                        <span className="ml-2 text-sm text-yellow-600">Awaiting response...</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {unavailableAdjusters.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Unavailable ({unavailableAdjusters.length})
              </h3>
              <div className="space-y-3">
                {unavailableAdjusters.map((adjuster) => (
                  <div key={adjuster.id} className="p-4 rounded-lg border border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-500">{adjuster.name}</div>
                        <div className="text-sm text-gray-400 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" /> {adjuster.phone}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center">
                            <MapPin className="h-3 w-3 mr-1" /> {adjuster.distance} miles
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">Not available</div>
                    </div>
                    {adjuster.responseTime && (
                      <div className="mt-2 text-xs text-gray-500">
                        Responded {adjuster.responseTime}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdjusterResults;
