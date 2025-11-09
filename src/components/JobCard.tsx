import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  postedAt: string;
  logo?: string;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  type,
  salary,
  description,
  postedAt,
  logo,
}: JobCardProps) => {
  return (
    <Card className="hover:shadow-hover transition-smooth cursor-pointer group">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4 flex-1">
            {logo && (
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <img src={logo} alt={company} className="w-full h-full object-cover rounded-lg" />
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-xl group-hover:text-primary transition-smooth">
                {title}
              </CardTitle>
              <CardDescription className="text-base font-medium mt-1">
                {company}
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Bookmark className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {location}
          </Badge>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            {type}
          </Badge>
          {salary && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {salary}
            </Badge>
          )}
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {postedAt}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <Link to={`/jobs/${id}`}>
          <Button className="w-full bg-gradient-hero hover:opacity-90 transition-smooth">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default JobCard;
