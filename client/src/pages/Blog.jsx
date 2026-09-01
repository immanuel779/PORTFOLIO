import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SectionWrapper from '../components/ui/SectionWrapper';
import SectionHeading from '../components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/blog')
      .then(res => { setPosts(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <SectionWrapper id="blog" className="pt-32">
      <SectionHeading title="My Blog" subtitle="Latest articles and insights" />
      <div className="grid md:grid-cols-3 gap-8">
        {loading ? (
          <p className="col-span-full text-center">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="col-span-full text-center">No blog posts yet.</p>
        ) : (
          posts.map((post, index) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Link to={`/blog/${post.slug}`} className="block bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-soft hover:shadow-premium transition-all duration-300 hover:-translate-y-2 group h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary-500/10 text-primary-500 rounded-full text-xs font-medium">{post.category}</span>
                  {/* FIXED DATE FORMAT */}
                  <span className="flex items-center text-sm text-dark-500 dark:text-dark-400"><Calendar className="w-4 h-4 mr-1" /> {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-500 transition-colors">{post.title}</h3>
                <p className="text-dark-600 dark:text-dark-300 mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center text-primary-500 font-medium">Read More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </SectionWrapper>
  );
}