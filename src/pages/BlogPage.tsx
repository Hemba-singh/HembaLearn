import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import Header from '../components/Header.tsx';

// Mock blog post data (you can replace this with actual data from a backend)
const blogPosts = [
  {
    id: 1,
    title: 'Introduction to Machine Learning',
    excerpt: 'Discover the fundamentals of machine learning and how it\'s transforming industries.',
    imageUrl: '/images/blog/ml-blog.jpg',
    date: '2024-01-15',
    author: 'Jane Doe'
  },
  {
    id: 2,
    title: 'Mastering React Hooks',
    excerpt: 'A comprehensive guide to understanding and implementing React Hooks effectively.',
    imageUrl: '/images/blog/react-hooks.jpg',
    date: '2024-02-20',
    author: 'John Smith'
  },
  {
    id: 3,
    title: 'The Future of AI Education',
    excerpt: 'Exploring how artificial intelligence is revolutionizing learning and skill development.',
    imageUrl: '/images/blog/ai-education.jpg',
    date: '2024-03-10',
    author: 'Alex Johnson'
  }
];

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState(blogPosts);

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
          HembaLearn Blog
        </Typography>

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
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.imageUrl}
                    alt={post.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption" color="text.secondary">
                        {post.date}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        By {post.author}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;
