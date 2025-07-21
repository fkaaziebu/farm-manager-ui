"use client";
import {
  Clock,
  User,
  ArrowRight,
  BookOpen,
  Eye,
  Wheat,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Integrated Farm Management: Combining Livestock and Crops",
      excerpt:
        "Learn how to optimize operations by managing grasscutter farming alongside crop cultivation.",
      author: "Dr. Samuel Asante",
      date: "2024-07-15",
      readTime: "8 min read",
      views: 2341,
      category: "mixed-farming",
    },
    {
      id: 2,
      title: "Seasonal Planning for Multi-Operation Farms",
      excerpt:
        "Strategic planning tips for coordinating planting seasons with breeding cycles.",
      author: "Mary Osei",
      date: "2024-07-12",
      readTime: "6 min read",
      views: 1876,
      category: "planning",
    },
    {
      id: 3,
      title: "Financial Management Across Different Farm Operations",
      excerpt:
        "Track profitability and manage budgets for both crop and livestock farming.",
      author: "Francis Amponsah",
      date: "2024-07-10",
      readTime: "7 min read",
      views: 3142,
      category: "finance",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "mixed-farming":
        return { icon: Wheat, color: "text-green-600" };
      case "planning":
        return { icon: Sprout, color: "text-amber-600" };
      case "finance":
        return { icon: BookOpen, color: "text-blue-600" };
      default:
        return { icon: BookOpen, color: "text-green-600" };
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-green-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-green-200 mb-6">
            <BookOpen className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">
              Knowledge Hub
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-4">
            Latest <span className="text-green-600">Agricultural Insights</span>
          </h2>
          <p className="text-xl text-green-700 max-w-2xl mx-auto">
            Expert advice for managing mixed agricultural operations, from
            livestock to crop farming.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => {
            const categoryData = getCategoryIcon(post.category);
            const CategoryIcon = categoryData.icon;

            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-green-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Article Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-green-100 to-amber-100 flex items-center justify-center">
                  <CategoryIcon className={`w-12 h-12 ${categoryData.color}`} />
                </div>

                {/* Article Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">
                    {post.title}
                  </h3>

                  <p className="text-green-700 text-sm mb-4">{post.excerpt}</p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-green-600 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author.split(" ")[0]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views > 999
                        ? `${(post.views / 1000).toFixed(1)}k`
                        : post.views}
                    </span>
                  </div>

                  {/* Read More */}
                  <Button
                    variant="ghost"
                    className="text-green-600 hover:text-green-700 p-0 h-auto"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-green-300 text-green-700 hover:bg-green-50 px-8 py-3"
          >
            <BookOpen className="mr-2 h-5 w-5" />
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};
