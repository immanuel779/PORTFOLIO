import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import SectionWrapper from '../components/ui/SectionWrapper';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // ✅ FIXED: Uses your live backend URL
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blog/${slug}`);
        setPost(res.data);
      } catch (err) {
        setError('Article not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) return <div className="pt-40 text-center text-2xl">Loading article...</div>;
  if (error) return <div className="pt-40 text-center text-2xl">{error}</div>;

  return (
    <SectionWrapper id="blog-post" className="pt-32">
      <Link to="/blog" className="inline-flex items-center text-primary-500 mb-8 hover:underline">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-dark-500 dark:text-dark-400 mb-4">
          <span className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">{post.category}</span>
          <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-dark-900 dark:text-white mb-8 leading-tight">
          {post.title}
        </h1>

        <div className="bg-white dark:bg-dark-800 p-8 rounded-2xl shadow-premium mb-8">
          <p className="text-lg text-dark-600 dark:text-dark-300 leading-relaxed mb-6 font-medium">
            {post.excerpt}
          </p>
          <div className="h-px bg-dark-100 dark:bg-dark-700 my-6" />
          <p className="text-lg text-dark-600 dark:text-dark-300 leading-relaxed whitespace-pre-line">
            {post.content}
          </p>
        </div>

        <div className="flex items-center justify-between mt-12">
          <Link to="/blog" className="text-primary-500 hover:underline">← Previous</Link>
          <Link to="/" className="text-primary-500 hover:underline">Home</Link>
        </div>
      </div>
    </SectionWrapper>
  );
}