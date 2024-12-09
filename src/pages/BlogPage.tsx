import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';
import Header from '../components/Header.tsx';

// Interface for blog post
interface BlogPost {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  published_at: string;
  user: {
    name: string;
  };
  url: string;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        // Fetch from Dev.to API - technology and programming articles
        const response = await axios.get('https://dev.to/api/articles', {
          params: {
            tag: 'programming',
            per_page: 12
          }
        });

        // Transform the response to match our expected format
        const transformedPosts: BlogPost[] = response.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          description: post.description,
          cover_image: post.cover_image || '/images/blog/default-blog.jpg',
          published_at: new Date(post.published_at).toISOString().split('T')[0],
          user: {
            name: post.user.name
          },
          url: post.url
        }));

        setPosts(transformedPosts);
        setIsLoading(false);
      } catch (err) {
        console.error('Blog fetch error:', err);
        setError('Failed to fetch blog posts. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 4 
          }}
        >
          Latest Blog
          <p className='text-gray-600 font-semibold text-sm italic'>
            Stay up to date with the latest news and insights from our blog.
          </p>
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item xs={12} md={4} key={post.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  <CardActionArea 
                    href={post.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={post.cover_image}
                      alt={post.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {post.description}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="caption" color="text.secondary">
                          {post.published_at}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          By {post.user.name}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Existing YouTube Video Section remains unchanged */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 3 
          }}
        >
        freeCodeCamp.org Videos
        <p className='text-gray-600 font-semibold text-sm italic'>
         (Front-end Crash Course videos from freeCodeCamp.org)
        </p>
        </Typography>

        <Grid container spacing={4}>
          {[
            "9He4UBLyk8Y", "916GWv2Qs08", "OXGznpKZ_sA", 
            "WPqXP_kLzpo", "jS4aFq5-91M", "_ZvnD73m40o", 
            "krfUjg0S2uI", "y51Cv4wnsPw", "RGOj5yH7evk", 
            "iJKCj8uAHz8", "2-crBg6wpp0", "ft30zcMlFao", 
            "VAeRhmpcWEQ", "u8vMu7viCm8", "8vfQ6SWBZ-U", 
            "30LWjhZzg50", "5199E50O7SI", "KjY94sAKLlw", 
            "obH0Po_RdWk", "e-hTm5VmofI", "YYe0FdfdgDU", 
            "zN8YNNHcaZc"
          ].map((videoId, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={videoId}
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'stretch'
              }}
            >
              <Box 
                sx={{ 
                  width: '100%', 
                  height: 0, 
                  paddingBottom: '56.25%', 
                  position: 'relative',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.05)'
                  }
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  src={`https://www.youtube.com/embed/${videoId}?si=default`}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;
