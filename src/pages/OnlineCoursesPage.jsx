import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import NewCoursePricingCard from '@/components/NewCoursePricingCard';

const newCoursesData = [
  {
    id: 'excelAccess',
    title: 'Microsoft Excel & Access Essentials',
    price: 89,
    duration: '20 hours (10 sessions of 2 hours each)',
    format: 'Live Online via Zoom + Recorded Sessions',
    description: 'Master the fundamentals of Microsoft Excel and Access in this beginner-friendly course. Learn to organize, analyze, and manage data effectively for professional use. Includes Excel functions, charts, PivotTables, Access table design, forms, queries, and report creation.',
    whoShouldAttend: 'Professionals, students, office workers, and small business owners who want to manage data efficiently and build simple databases without programming.',
  },
  {
    id: 'wordpress',
    title: 'WordPress Website Creation (No Coding Required)',
    price: 95,
    duration: '16 hours (8 sessions of 2 hours)',
    format: 'Live Online + Hands-On Practice',
    description: 'Create your own responsive and modern website using WordPress without writing a single line of code. Learn domain/hosting setup, choosing themes, using plugins, setting up blogs, and building a full business or portfolio site.',
    whoShouldAttend: 'Entrepreneurs, designers, content creators, small business owners, and anyone who wants a professional-looking website without coding.',
  },
  {
    id: 'phpMysql',
    title: 'Full Website Design with PHP & MySQL',
    price: 149,
    duration: '32 hours (16 sessions of 2 hours)',
    format: 'Live Online + Full Project',
    description: 'This course teaches you to build dynamic and secure websites from scratch using PHP and MySQL. You’ll learn backend logic, form handling, database integration, login systems, and how to deploy a full website.',
    whoShouldAttend: 'Aspiring developers, students in IT or computer science, freelancers, and anyone looking to learn backend web development.',
  },
  {
    id: 'frontend',
    title: 'Frontend Web Development: HTML, CSS & JavaScript',
    price: 125,
    duration: '28 hours (14 sessions of 2 hours)',
    format: 'Live Online + Project-Based',
    description: 'Learn the core technologies of the web. Build interactive, responsive websites using HTML for structure, CSS for styling, and JavaScript for behavior. Includes responsive design and DOM manipulation.',
    whoShouldAttend: 'Beginners aiming to become frontend developers, UI/UX designers, digital marketers, or students starting their programming journey.',
  },
  {
    id: 'vbnet',
    title: 'VB.NET Programming for Windows Applications',
    price: 110,
    duration: '24 hours (12 sessions of 2 hours)',
    format: 'Live Online + Projects',
    description: 'Develop Windows desktop applications using Visual Basic .NET. You’ll learn variables, forms, event-driven programming, file handling, and database connectivity using ADO.NET.',
    whoShouldAttend: 'Students in engineering/IT, desktop application developers, or professionals needing to build in-house tools or automation for Windows.',
  },
  {
    id: 'csharpWinforms',
    title: 'C#.NET Programming with Windows Forms',
    price: 129,
    duration: '26 hours (13 sessions of 2 hours)',
    format: 'Live Online + Projects',
    description: 'Learn C# language fundamentals and how to create powerful Windows applications with .NET. This course includes object-oriented programming, GUI design, data management, and debugging skills.',
    whoShouldAttend: 'IT students, software developers, and engineers interested in building enterprise-level desktop applications or transitioning from other languages.',
  }
];


const OnlineCoursesPage = () => {
  const { t } = useTranslation(['common', 'onlineCoursesData']);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 md:py-16 container mx-auto px-4 font-sans"
    >
      <Helmet>
        <title>{`${t('common:onlineCourses')} - ${t('common:websdew')}`}</title>
        <meta name="description" content={t('common:onlineCoursesPageDesc')} />
        <meta property="og:title" content={`${t('common:onlineCourses')} - ${t('common:websdew')}`} />
        <meta property="og:description" content={t('common:onlineCoursesPageDesc')} />
      </Helmet>

      <header className="mb-12 md:mb-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 120 }}>
          <GraduationCap className="w-16 h-16 md:w-20 md:h-20 text-primary mx-auto mb-4" />
        </motion.div>
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-foreground leading-tight"
        >
          {t('common:onlineCourses')}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
        >
          {t('common:onlineCoursesPageDesc')}
        </motion.p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {newCoursesData.map((course, index) => (
          <NewCoursePricingCard key={course.id} course={course} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default OnlineCoursesPage;