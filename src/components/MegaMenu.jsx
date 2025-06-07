import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from "@/lib/utils";
import { BarChart2, Layers, BookOpen, Briefcase, ShoppingCart, Users, Phone, LifeBuoy, Info } from 'lucide-react';

const servicesAndProductsItems = [
  { titleKey: 'seoServices', href: '/seo-services', descriptionKey: 'seoServicesDesc', icon: <BarChart2 className="h-5 w-5" /> },
  { titleKey: 'webDesign', href: '/web-design', descriptionKey: 'webDesignDesc', icon: <Layers className="h-5 w-5" /> },
  { titleKey: 'onlineCourses', href: '/online-courses', descriptionKey: 'onlineCoursesDesc', icon: <BookOpen className="h-5 w-5" /> },
  { titleKey: 'digitalMarketing', href: '/digital-marketing', descriptionKey: 'digitalMarketingDesc', icon: <Briefcase className="h-5 w-5" /> },
  { titleKey: 'products', href: '/products', descriptionKey: 'productsDesc', icon: <ShoppingCart className="h-5 w-5" /> },
  { titleKey: 'crmServices', href: '/crm-services', descriptionKey: 'crmServicesDesc', icon: <Users className="h-5 w-5" /> },
];

const contactItems = [
  { titleKey: 'generalContact', href: '/contact-us', descriptionKey: 'generalContactDesc', icon: <Phone className="h-5 w-5" /> },
  { titleKey: 'support', href: '/support', descriptionKey: 'supportDesc', icon: <LifeBuoy className="h-5 w-5" /> },
  { titleKey: 'aboutUs', href: '/about-us', descriptionKey: 'aboutUsDesc', icon: <Info className="h-5 w-5" /> },
];

const MegaMenu = ({ menuKey }) => {
  const { t } = useTranslation();

  let itemsToDisplay;
  let triggerTextKey;

  if (menuKey === 'servicesAndProducts') {
    itemsToDisplay = servicesAndProductsItems;
    triggerTextKey = 'servicesAndProducts';
  } else if (menuKey === 'contactUs') {
    itemsToDisplay = contactItems;
    triggerTextKey = 'contactUs';
  } else {
    return null; 
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base bg-transparent hover:bg-accent focus:bg-accent data-[state=open]:bg-accent">
            {t(triggerTextKey)}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className={cn(
                "grid gap-3 p-4 md:grid-cols-2",
                menuKey === 'servicesAndProducts' ? "w-[400px] md:w-[500px] lg:w-[600px]" : "w-[300px] md:w-[400px] lg:w-[500px]"
              )}
            >
              {itemsToDisplay.map((item) => (
                <ListItem
                  key={t(item.titleKey)}
                  title={t(item.titleKey)}
                  to={item.href}
                  icon={item.icon}
                >
                  {t(item.descriptionKey)}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef(({ className, title, children, to, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {React.cloneElement(icon, { className: cn(icon.props.className, "text-primary")})}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default MegaMenu;