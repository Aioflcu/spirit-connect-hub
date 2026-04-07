import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useGalleryUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, caption: string) => {
    if (!file) {
      toast.error('No image file selected.');
      return false;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from('gallery-bucket')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from('gallery-bucket')
        .getPublicUrl(data!.path!);

      const { error: dbError } = await supabase
        .from('galleries')
        .insert({ caption, image_url: publicData.publicUrl });

      if (dbError) throw dbError;

      toast.success('Image uploaded!');
      return true;
    } catch (error: any) {
      toast.error(error?.message || 'Failed to upload image.');
      return false;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};

export const useMessagesUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadMessage = async (formData: FormData) => {
    const title = formData.get('title');
    const transcript = formData.get('transcript');
    const audioFile = formData.get('audio');
    const imageFile = formData.get('image');

    if (!title || typeof title !== 'string') {
      toast.error('Message title is required.');
      return false;
    }

    setUploading(true);
    try {
      let audioUrl = '';
      let imageUrl = '';

      if (audioFile instanceof File) {
        const fileExt = audioFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { data, error: audioError } = await supabase.storage
          .from('messages-bucket')
          .upload(fileName, audioFile);

        if (audioError) throw audioError;
        const { data: publicData } = supabase.storage
          .from('messages-bucket')
          .getPublicUrl(data!.path!);
        audioUrl = publicData.publicUrl;
      }

      if (imageFile instanceof File) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const { data, error: imageError } = await supabase.storage
          .from('gallery-bucket')
          .upload(fileName, imageFile);

        if (imageError) throw imageError;
        const { data: publicData } = supabase.storage
          .from('gallery-bucket')
          .getPublicUrl(data!.path!);
        imageUrl = publicData.publicUrl;
      }

      const { error: dbError } = await supabase
        .from('messages')
        .insert({
          title,
          audio_url: audioUrl,
          transcript: typeof transcript === 'string' ? transcript : null,
          image_url: imageUrl,
        });

      if (dbError) throw dbError;

      toast.success('Message published!');
      return true;
    } catch (error: any) {
      toast.error(error?.message || 'Failed to publish message.');
      return false;
    } finally {
      setUploading(false);
    }
  };

  return { uploadMessage, uploading };
};

