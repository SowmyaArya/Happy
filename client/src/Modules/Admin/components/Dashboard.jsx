import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import axios from 'axios'; // Import axios for HTTP requests
import PeopleIcon from '@mui/icons-material/People';
import BookIcon from '@mui/icons-material/Book';
import FeedbackIcon from '@mui/icons-material/Feedback';
import TodayIcon from '@mui/icons-material/Today';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBookings: 0,
    totalFeedback: 0,
    bookingsToday: 0,
  });

  useEffect(() => {
    // Function to fetch data from backend
    const fetchData = async () => {
      try {
        const [usersRes, bookingsRes, feedbackRes, bookingsTodayRes] = await Promise.all([
          axios.get('http://localhost:5002/api/user/getUserCount'),
          axios.get('http://localhost:5002/api/Booking/count'),
          axios.get('http://localhost:5002/api/Feedback/get'),
          axios.get('http://localhost:5002/api/Booking/countToday'),
        ]);

        setStats({
          totalUsers: usersRes.data.count,
          totalBookings: bookingsRes.data.count,
          totalFeedback: feedbackRes.data.count,
          bookingsToday: bookingsTodayRes.data.count,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const cardStyle = {
    maxWidth: 345,
    background: 'linear-gradient(to left, #009900, #19334d, #19334d)',
    borderRadius: '10px',
    textAlign: 'center',
    color: 'white',
  };

  const iconStyle = {
    fontSize: '3rem',
    color: 'white',
  };

  const animateImage = {
    animation: 'spin 4s infinite linear',
  };

  return (
    <Grid container spacing={3} style={{ padding: '20px' }}>
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardActionArea>
            <PeopleIcon sx={iconStyle} style={animateImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total Users
              </Typography>
              <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                {stats.totalUsers}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardActionArea>
            <BookIcon sx={iconStyle} style={animateImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total Bookings
              </Typography>
              <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                {stats.totalBookings}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardActionArea>
            <FeedbackIcon sx={iconStyle} style={animateImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Total Feedback
              </Typography>
              <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                {stats.totalFeedback}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={cardStyle}>
          <CardActionArea>
            <TodayIcon sx={iconStyle} style={animateImage} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Bookings Today
              </Typography>
              <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                {stats.bookingsToday}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </Grid>
  );
};

export default Dashboard;
