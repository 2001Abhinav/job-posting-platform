import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Clock, IndianRupee } from "lucide-react";
import { Link } from "wouter";

interface JobCardProps {
  job: {
    id: number;
    title: string;
    company: string;
    location: string;
    salary?: string;
    type: string;
    experience: string;
    description: string;
    skills?: string;
    createdAt: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const getTypeBadge = (type: string) => {
    const typeConfig = {
      "Full-time": "bg-success text-white",
      "Part-time": "bg-blue-500 text-white",
      "Contract": "bg-warning text-white",
      "Internship": "bg-purple-500 text-white",
    };

    return (
      <Badge className={typeConfig[type as keyof typeof typeConfig] || "bg-gray-500 text-white"}>
        {type}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Posted today";
    if (diffInDays === 1) return "Posted 1 day ago";
    if (diffInDays < 7) return `Posted ${diffInDays} days ago`;
    if (diffInDays < 30) return `Posted ${Math.floor(diffInDays / 7)} weeks ago`;
    return `Posted ${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <Card className="hover:shadow-md transition-shadow border border-gray-200">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
              {getTypeBadge(job.type)}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 line-clamp-3">
              {job.description.length > 200 
                ? `${job.description.substring(0, 200)}...` 
                : job.description}
            </p>
            
            {job.skills && (
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.split(",").slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                    {skill.trim()}
                  </Badge>
                ))}
                {job.skills.split(",").length > 4 && (
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                    +{job.skills.split(",").length - 4} more
                  </Badge>
                )}
              </div>
            )}
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {job.salary && (
                <div className="flex items-center gap-1">
                  <IndianRupee className="h-3 w-3" />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatDate(job.createdAt)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-6">
            <Link href={`/jobs/${job.id}`}>
              <Button className="w-full md:w-auto px-6 py-2 font-medium">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
