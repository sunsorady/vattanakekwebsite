import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Play, Search } from 'lucide-react';

type VideoItem = {
  id: string;
  title: string;
  category: string;
  views: string;
  duration: string;
  description?: string;
};

const videos: VideoItem[] = [
  {
    id: 'iRU_5QkC8WY',
    title: 'Pathway to be Gastroenterologist 👩‍⚕️⚕️Dr. Ek Vatanak',
    category: 'Doctor life',
    views: '12k',
    duration: '1:48:30',
    description: 'My journey, training, and pathway toward becoming a gastroenterologist.'
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Understanding Acid Reflux & GERD',
    category: 'Patient education',
    views: '5k',
    duration: '12:45',
    description: 'A simple explanation of reflux symptoms, causes, and treatment options.'
  },
  {
    id: 'M7lc1UVf-VE',
    title: 'What to expect during a Colonoscopy',
    category: 'Gastroenterology',
    views: '8k',
    duration: '08:20',
    description: 'Preparation, procedure overview, and what patients should expect.'
  },
  {
    id: 'ysz5S6PUM-U',
    title: 'Hemorrhoids: Causes and Treatments',
    category: 'Proctology',
    views: '15k',
    duration: '10:15',
    description: 'Common causes of hemorrhoids and available treatment approaches.'
  },
];

const categories = ['All', 'Gastroenterology', 'Proctology', 'Patient education', 'Doctor life'];

export default function VideosPage() {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videos[0]);

  const filteredVideos = useMemo(() => {
    return videos.filter(
      (v) =>
        (activeCat === 'All' || v.category === activeCat) &&
        v.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [activeCat, search]);

  const featuredVideo =
    filteredVideos.find((v) => v.id === selectedVideo.id) ?? filteredVideos[0] ?? videos[0];

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4">Educational Videos</h1>
        <p className="text-slate-600 dark:text-slate-400">
          Digestive health tips, endoscopy explanations, proctology insights and life journeys.
        </p>
      </div>

      {/* Featured Player */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="aspect-video bg-black">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${featuredVideo.id}`}
            title={featuredVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="p-6">
          <div className="text-xs font-bold text-rose-500 mb-2 uppercase tracking-wider">
            {featuredVideo.category}
          </div>
          <h2 className="text-2xl font-bold mb-2">{featuredVideo.title}</h2>
          <div className="text-sm text-slate-500 mb-3">
            {featuredVideo.views} views • {featuredVideo.duration}
          </div>
          {featuredVideo.description && (
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {featuredVideo.description}
            </p>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCat === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:border-rose-500 text-sm"
          />
        </div>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video, i) => (
          <motion.button
            key={video.id}
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelectedVideo(video)}
            className={`group text-left bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border transition-all cursor-pointer ${
              featuredVideo.id === video.id
                ? 'border-rose-500 ring-2 ring-rose-200 dark:ring-rose-900'
                : 'border-slate-100 dark:border-slate-700'
            }`}
          >
            <div className="relative aspect-video bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all shadow-lg">
                  <Play className="w-5 h-5 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-medium">
                {video.duration}
              </div>
            </div>

            <div className="p-4">
              <div className="text-xs font-bold text-rose-500 mb-2 uppercase tracking-wider">
                {video.category}
              </div>
              <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">
                {video.title}
              </h3>
              <div className="text-sm text-slate-500">{video.views} views</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}