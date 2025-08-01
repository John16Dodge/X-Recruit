import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, PlusCircle, Trash2, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Event {
  name: string;
  date: string;
  venue: string;
  description: string;
  type: string;
}

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([
    { name: '', date: '', venue: '', description: '', type: '' }
  ]);

  const [isEditing, setIsEditing] = useState(true);

  const handleEventChange = (index: number, field: keyof Event, value: string) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const addEvent = () => {
    setEvents([...events, { name: '', date: '', venue: '', description: '', type: '' }]);
  };

  const removeEvent = (index: number) => {
    if (events.length > 1) {
      setEvents(events.filter((_, i) => i !== index));
    } else {
      toast.error('At least one event is required');
    }
  };

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving events:', events);
    toast.success('Events saved successfully!');
    setIsEditing(false);
  };

  const eventTypes = [
    'Technical Symposium',
    'Cultural Fest',
    'Workshop',
    'Seminar',
    'Conference',
    'Placement Drive',
    'Alumni Meet',
    'Hackathon',
    'Sports Event',
    'Other'
  ];

  return (
    <Card className="w-full shadow-md mt-6">
      <CardHeader className="bg-slate-50 dark:bg-slate-800">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Events & Activities</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {isEditing ? (
          <div className="space-y-6">
            {events.map((event, index) => (
              <div key={index} className="p-4 border rounded-lg relative space-y-3">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => removeEvent(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Name</label>
                  <Input
                    value={event.name}
                    onChange={(e) => handleEventChange(index, 'name', e.target.value)}
                    placeholder="e.g., Tech Fest 2023, Annual Sports Meet"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Type</label>
                    <select
                      value={event.type}
                      onChange={(e) => handleEventChange(index, 'type', e.target.value)}
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="">Select Event Type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <Input
                      type="date"
                      value={event.date}
                      onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Venue</label>
                    <Input
                      value={event.venue}
                      onChange={(e) => handleEventChange(index, 'venue', e.target.value)}
                      placeholder="e.g., Main Auditorium, Sports Ground"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={event.description}
                    onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                    placeholder="Brief description of the event"
                    rows={3}
                  />
                </div>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              onClick={addEvent}
              className="w-full"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Event
            </Button>

            <Button 
              onClick={handleSave} 
              className="w-full mt-4"
            >
              <Save className="mr-2 h-4 w-4" /> Save Events
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {events.some(event => event.name) ? (
              <div className="space-y-4">
                {events.map((event, index) => (
                  event.name ? (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{event.name}</h3>
                        {event.type && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {event.type}
                          </span>
                        )}
                      </div>
                      
                      <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
                        {event.date && (
                          <div className="flex items-center mr-4">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        )}
                        {event.venue && (
                          <div>
                            @ {event.venue}
                          </div>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{event.description}</p>
                      )}
                    </div>
                  ) : null
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No events added yet. Click Edit to add events.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsSection;