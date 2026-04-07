import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Play, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { GallerySection } from '@/components/GallerySection';

interface Message {
  id: string;
  title: string;
  audio_url: string;
  transcript: string;
  image_url: string;
  created_at: string;
}

const MessagesPage = () => {
  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const playAudio = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-16 text-gray-800">Messages & Sermons</h1>
        
        <div className="max-w-4xl mx-auto">
          {messages && messages.length > 0 ? (
            messages.map((message) => (
              <Card key={message.id} className="mb-8 hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">{message.title}</CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    {new Date(message.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {message.image_url && (
                    <img 
                      src={message.image_url} 
                      alt={message.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                  
                  <div className="flex gap-4">
                    {message.audio_url && (
                      <>
                        <Button 
                          onClick={() => playAudio(message.audio_url)}
                          className="flex items-center gap-2"
                        >
                          <Play className="h-4 w-4" />
                          Play
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {message.transcript && (
                    <div className="pt-6 border-t">
                      <h3 className="font-semibold mb-4 text-lg">Transcript</h3>
                      <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{message.transcript}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="text-center py-16">
              <CardContent>
                <p className="text-xl text-gray-500">No messages yet. Check back soon for sermons!</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Gallery on messages page too */}
      <GallerySection />
    </div>
  );
};

export default MessagesPage;

