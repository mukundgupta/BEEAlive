import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Camera, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function FeedbackTab() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
  });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Feedback submitted successfully!');
    
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ type: '', title: '', description: '', location: '' });
      setUploadedFiles([]);
    }, 3000);
  };

  const handleFileUpload = () => {
    toast.success('Photo uploaded successfully!');
    setUploadedFiles([...uploadedFiles, 'photo.jpg']);
  };

  if (submitted) {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <Card className="p-8 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-green-900 mb-2">Thank You!</h2>
          <p className="text-green-700">
            Your feedback has been submitted and will help us build a stronger bee conservation network.
          </p>
          <div className="mt-6 text-4xl">🐝✨</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <Card className="p-4 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 text-white border-none">
        <h2>Share Your Observations</h2>
        <p className="text-orange-100 text-sm mt-1">
          Help us track bee activity and tower maintenance
        </p>
      </Card>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Feedback Type */}
        <Card className="p-4 rounded-2xl bg-white border-stone-200">
          <Label htmlFor="feedback-type" className="text-stone-700">
            Feedback Type
          </Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="mt-2 rounded-xl">
              <SelectValue placeholder="Select feedback type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bee-sighting">🐝 Bee Sighting</SelectItem>
              <SelectItem value="tower-maintenance">🏛️ Tower Maintenance</SelectItem>
              <SelectItem value="new-plants">🌺 New Plants Added</SelectItem>
              <SelectItem value="honey-harvest">🍯 Honey Harvest Data</SelectItem>
              <SelectItem value="community-event">👥 Community Event</SelectItem>
              <SelectItem value="other">💬 Other</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Title */}
        <Card className="p-4 rounded-2xl bg-white border-stone-200">
          <Label htmlFor="title" className="text-stone-700">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Brief description..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-2 rounded-xl"
          />
        </Card>

        {/* Location */}
        <Card className="p-4 rounded-2xl bg-white border-stone-200">
          <Label htmlFor="location" className="text-stone-700">
            Location
          </Label>
          <Input
            id="location"
            type="text"
            placeholder="Community or specific location..."
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-2 rounded-xl"
          />
        </Card>

        {/* Description */}
        <Card className="p-4 rounded-2xl bg-white border-stone-200">
          <Label htmlFor="description" className="text-stone-700">
            Detailed Description
          </Label>
          <Textarea
            id="description"
            placeholder="Share details about your observation..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-2 rounded-xl min-h-[120px]"
          />
        </Card>

        {/* Photo Upload */}
        <Card className="p-4 rounded-2xl bg-amber-50 border-amber-200">
          <Label className="text-amber-900 mb-3 block">Upload Photos</Label>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleFileUpload}
              className="h-24 rounded-xl border-2 border-dashed border-amber-300 hover:bg-amber-100 flex flex-col gap-2"
            >
              <Camera className="w-6 h-6 text-amber-600" />
              <span className="text-sm text-amber-700">Take Photo</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleFileUpload}
              className="h-24 rounded-xl border-2 border-dashed border-amber-300 hover:bg-amber-100 flex flex-col gap-2"
            >
              <Upload className="w-6 h-6 text-amber-600" />
              <span className="text-sm text-amber-700">Upload File</span>
            </Button>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg"
                >
                  <ImageIcon className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-stone-700">{file}</span>
                  <CheckCircle2 className="w-4 h-4 text-green-600 ml-auto" />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white h-12"
          disabled={!formData.type || !formData.title}
        >
          Submit Feedback
        </Button>
      </form>

      {/* Info Card */}
      <Card className="p-4 rounded-2xl bg-green-50 border-green-200">
        <h3 className="text-green-900 mb-2">💡 Tips for Quality Submissions</h3>
        <ul className="space-y-1 text-sm text-green-800">
          <li>• Include clear, well-lit photos</li>
          <li>• Specify exact locations when possible</li>
          <li>• Note the date and time of observations</li>
          <li>• Be detailed in your descriptions</li>
        </ul>
      </Card>
    </div>
  );
}
