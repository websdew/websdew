import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Info, Users, Target, Eye } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();

  const teamMembers = [
    { name: "Jane Doe", role: "CEO & Founder", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "John Smith", role: "Lead Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Alice Johnson", role: "Marketing Director", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8"
    >
      <Helmet>
        <title>{`${t('aboutUs')} - ${t('websdew')}`}</title>
        <meta name="description" content={t('aboutUsDesc')} />
        <meta property="og:title" content={`${t('aboutUs')} - ${t('websdew')}`} />
        <meta property="og:description" content={t('aboutUsDesc')} />
      </Helmet>

      <header className="mb-12 text-center">
        <Info className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-foreground">{t('aboutUs')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('aboutUsDesc')}</p>
      </header>
      
      <motion.section 
        className="mb-16 bg-card/70 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-border/40"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-primary">Our Story</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Founded in [Year], Websdew started with a simple mission: to help businesses thrive in the digital world. We believe in the power of technology and creative solutions to transform ideas into reality. Over the years, we've grown into a passionate team of experts dedicated to delivering exceptional results for our clients.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our approach is collaborative and client-focused. We take the time to understand your unique needs and goals, crafting tailored strategies that drive growth and success. We're not just service providers; we're your partners in digital excellence.
        </p>
      </motion.section>

      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-card/50 rounded-lg shadow-md">
            <Target className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Client Success</h3>
            <p className="text-sm text-muted-foreground">Your success is our priority. We're committed to achieving your goals.</p>
          </div>
          <div className="text-center p-6 bg-card/50 rounded-lg shadow-md">
            <Users className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Innovation</h3>
            <p className="text-sm text-muted-foreground">We embrace creativity and continuously seek innovative solutions.</p>
          </div>
          <div className="text-center p-6 bg-card/50 rounded-lg shadow-md">
            <Eye className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">Transparency</h3>
            <p className="text-sm text-muted-foreground">We believe in open communication and building trust with our clients.</p>
          </div>
        </div>
      </motion.section>
      
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-3xl font-semibold mb-8 text-center text-primary">Meet The Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center bg-card/50 p-6 rounded-lg shadow-md">
              <img-replace src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
              <p className="text-primary">{member.role}</p>
            </div>
          ))}
        </div>
      </motion.section>

    </motion.div>
  );
};

export default AboutPage;