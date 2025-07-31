const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8083', 'http://localhost:3000', 'http://localhost:5173', 'http://localhost:8084'],
  credentials: true
}));
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      userType TEXT DEFAULT 'student' CHECK(userType IN ('student', 'recruiter', 'admin')),
      headline TEXT,
      summary TEXT,
      location TEXT,
      phone TEXT,
      website TEXT,
      linkedin TEXT,
      github TEXT,
      portfolio TEXT,
      profilePicture TEXT,
      coverPhoto TEXT,
      isOpenToWork BOOLEAN DEFAULT false,
      preferredJobTypes TEXT,
      salaryExpectation TEXT,
      availableFrom DATE,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);  

  // Experience table
  db.run(`
    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT,
      employmentType TEXT CHECK(employmentType IN ('full-time', 'part-time', 'contract', 'internship', 'freelance', 'volunteer')),
      startDate DATE NOT NULL,
      endDate DATE,
      isCurrentPosition BOOLEAN DEFAULT false,
      description TEXT,
      skills TEXT,
      mediaUrl TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Education table
  db.run(`
    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      institution TEXT NOT NULL,
      degree TEXT NOT NULL,
      fieldOfStudy TEXT,
      startDate DATE,
      endDate DATE,
      grade TEXT,
      activities TEXT,
      description TEXT,
      isCurrentlyStudying BOOLEAN DEFAULT false,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Skills table
  db.run(`
    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      skillName TEXT NOT NULL,
      proficiencyLevel TEXT CHECK(proficiencyLevel IN ('beginner', 'intermediate', 'advanced', 'expert')),
      endorsements INTEGER DEFAULT 0,
      yearsOfExperience INTEGER,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Certifications table
  db.run(`
    CREATE TABLE IF NOT EXISTS certifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      name TEXT NOT NULL,
      issuingOrganization TEXT NOT NULL,
      issueDate DATE,
      expirationDate DATE,
      credentialId TEXT,
      credentialUrl TEXT,
      skills TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Projects table
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      startDate DATE,
      endDate DATE,
      isOngoing BOOLEAN DEFAULT false,
      projectUrl TEXT,
      skills TEXT,
      collaborators TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Languages table
  db.run(`
    CREATE TABLE IF NOT EXISTS languages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      language TEXT NOT NULL,
      proficiency TEXT CHECK(proficiency IN ('elementary', 'limited-working', 'professional-working', 'full-professional', 'native')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Volunteer Experience table
  db.run(`
    CREATE TABLE IF NOT EXISTS volunteer_experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      role TEXT NOT NULL,
      organization TEXT NOT NULL,
      cause TEXT,
      startDate DATE,
      endDate DATE,
      isCurrentRole BOOLEAN DEFAULT false,
      description TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Jobs table
  db.run(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recruiterId INTEGER NOT NULL,
      title TEXT NOT NULL,
      company TEXT NOT NULL,
      location TEXT NOT NULL,
      type TEXT DEFAULT 'full-time' CHECK(type IN ('full-time', 'part-time', 'internship', 'contract', 'remote')),
      description TEXT NOT NULL,
      requirements TEXT,
      skills TEXT,
      salary TEXT,
      experience TEXT DEFAULT 'entry-level' CHECK(experience IN ('entry-level', 'mid-level', 'senior-level')),
      applicationDeadline DATETIME,
      status TEXT DEFAULT 'active' CHECK(status IN ('active', 'paused', 'closed')),
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (recruiterId) REFERENCES users (id) ON DELETE CASCADE
    )
  `);

  // Applications table
  db.run(`
    CREATE TABLE IF NOT EXISTS applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jobId INTEGER NOT NULL,
      studentId INTEGER NOT NULL,
      coverLetter TEXT,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'reviewed', 'shortlisted', 'rejected', 'hired')),
      notes TEXT,
      appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (jobId) REFERENCES jobs (id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users (id) ON DELETE CASCADE,
      UNIQUE(jobId, studentId)
    )
  `);
});

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate password strength
const isValidPassword = (password) => {
  return password.length >= 8;
};

// User registration endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, userType } = req.body;

    // Validation
    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    if (firstName.length < 2 || lastName.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'First name and last name must be at least 2 characters long'
      });
    }

    // Check if user already exists
    db.get('SELECT email FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }

      if (row) {
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      try {
        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        db.run(
          `INSERT INTO users (email, password, firstName, lastName, userType) VALUES (?, ?, ?, ?, ?)`,
          [email, hashedPassword, firstName, lastName, userType || 'student'],
          function(err) {
            if (err) {
              console.error('Database insert error:', err);
              return res.status(500).json({
                success: false,
                message: 'Failed to create user account'
              });
            }

            // Generate JWT token
            const token = jwt.sign(
              { 
                userId: this.lastID, 
                email: email,
                firstName: firstName,
                lastName: lastName,
                userType: userType || 'student'
              },
              JWT_SECRET,
              { expiresIn: '24h' }
            );

            res.status(201).json({
              success: true,
              message: 'Account created successfully',
              data: {
                token,
                user: {
                  id: this.lastID,
                  email,
                  firstName,
                  lastName
                }
              }
            });
          }
        );
      } catch (hashError) {
        console.error('Password hashing error:', hashError);
        return res.status(500).json({
          success: false,
          message: 'Failed to process password'
        });
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// User login endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user by email
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Internal server error'
        });
      }

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      try {
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
          });
        }

        // Generate JWT token
        const token = jwt.sign(
          { 
            userId: user.id, 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            userType: user.userType
          },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({
          success: true,
          message: 'Login successful',
          data: {
            token,
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName
            }
          }
        });
      } catch (compareError) {
        console.error('Password comparison error:', compareError);
        return res.status(500).json({
          success: false,
          message: 'Authentication failed'
        });
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user profile endpoint (protected)
app.get('/api/user/profile', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Invalid token'
        });
      }

      const query = `SELECT * FROM users WHERE id = ?`;

      db.get(query, [decoded.userId], (err, user) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Internal server error'
          });
        }

        if (!user) {
          return res.status(404).json({
            success: false,
            message: 'User not found'
          });
        }

        // Remove password from response
        delete user.password;
        
        res.json({
          success: true,
          data: { user }
        });
      });
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Middleware to verify JWT and user roles
const authenticate = (requiredRole) => (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }

    req.user = decoded;
    if (requiredRole && req.user.userType !== requiredRole) {
      return res.status(403).json({ success: false, message: `Access denied. Requires ${requiredRole} role.` });
    }
    next();
  });
};

// Update user profile endpoint (protected)
app.put('/api/user/profile', authenticate(), (req, res) => {
  try {
    const userId = req.user.userId;
    const profileData = req.body;

    const query = `UPDATE users SET
      headline = ?,
      summary = ?,
      location = ?,
      phone = ?,
      website = ?,
      linkedin = ?,
      github = ?,
      portfolio = ?,
      profilePicture = ?,
      coverPhoto = ?,
      isOpenToWork = ?,
      preferredJobTypes = ?,
      salaryExpectation = ?,
      availableFrom = ?,
      updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?`;

    const params = [
      profileData.headline,
      profileData.summary,
      profileData.location,
      profileData.phone,
      profileData.website,
      profileData.linkedin,
      profileData.github,
      profileData.portfolio,
      profileData.profilePicture,
      profileData.coverPhoto,
      profileData.isOpenToWork,
      profileData.preferredJobTypes,
      profileData.salaryExpectation,
      profileData.availableFrom,
      userId
    ];

    db.run(query, params, function(err) {
      if (err) {
        console.error('Database update error:', err);
        return res.status(500).json({
          success: false,
          message: 'Failed to update profile'
        });
      }

      res.json({
        success: true,
        message: 'Profile updated successfully'
      });
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});


// Job Endpoints
// Create a new job (recruiter only)
app.post('/api/jobs', authenticate('recruiter'), (req, res) => {
  const { title, company, location, type, description, requirements, skills, salary, experience, applicationDeadline } = req.body;
  const recruiterId = req.user.userId;

  db.run(
    'INSERT INTO jobs (recruiterId, title, company, location, type, description, requirements, skills, salary, experience, applicationDeadline) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [recruiterId, title, company, location, type, description, requirements, skills, salary, experience, applicationDeadline],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to create job' });
      }
      res.status(201).json({ success: true, message: 'Job created successfully', jobId: this.lastID });
    }
  );
});

// Get all jobs (public)
app.get('/api/jobs', (req, res) => {
  db.all('SELECT * FROM jobs WHERE status = ?', ['active'], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
    }
    res.json({ success: true, data: { jobs: rows } });
  });
});

// Get a single job (public)
app.get('/api/jobs/:id', (req, res) => {
  db.get('SELECT * FROM jobs WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch job' });
    }
    if (!row) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: { job: row } });
  });
});

// Apply for a job (student only)
app.post('/api/jobs/:id/apply', authenticate('student'), (req, res) => {
  const jobId = req.params.id;
  const studentId = req.user.userId;
  const { coverLetter } = req.body;

  db.run('INSERT INTO applications (jobId, studentId, coverLetter) VALUES (?, ?, ?)', [jobId, studentId, coverLetter], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to apply for job' });
    }
    res.status(201).json({ success: true, message: 'Applied for job successfully', applicationId: this.lastID });
  });
});

// Get applicants for a job (recruiter only)
app.get('/api/jobs/:id/applicants', authenticate('recruiter'), (req, res) => {
  const jobId = req.params.id;

  db.all(
    `SELECT u.id, u.firstName, u.lastName, u.email, a.status, a.appliedAt 
     FROM applications a 
     JOIN users u ON a.studentId = u.id 
     WHERE a.jobId = ?`,
    [jobId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to fetch applicants' });
      }
      res.json({ success: true, data: { applicants: rows } });
    }
  );
});
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'X-Recruit API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ X-Recruit Backend Server is running on port ${PORT}`);
  console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('📦 Database connection closed.');
    }
    process.exit(0);
  });
});
