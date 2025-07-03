
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle,
  Bell,
  ArrowDown,
  CircleDollarSign
} from "lucide-react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const inventoryItems = [
    {
      id: 1,
      name: "Organic Milk 1L",
      category: "Dairy",
      quantity: 45,
      expiryDate: "2024-07-05",
      daysUntilExpiry: 2,
      urgency: "high",
      price: 4.99,
      suggestedDiscount: 30,
      location: "Aisle 12-A"
    },
    {
      id: 2,
      name: "Fresh Bread Loaves",
      category: "Bakery",
      quantity: 28,
      expiryDate: "2024-07-04",
      daysUntilExpiry: 1,
      urgency: "critical",
      price: 2.99,
      suggestedDiscount: 50,
      location: "Bakery Section"
    },
    {
      id: 3,
      name: "Bananas 2lb",
      category: "Produce",
      quantity: 67,
      expiryDate: "2024-07-07",
      daysUntilExpiry: 4,
      urgency: "medium",
      price: 1.99,
      suggestedDiscount: 15,
      location: "Produce Section"
    },
    {
      id: 4,
      name: "Greek Yogurt",
      category: "Dairy",
      quantity: 34,
      expiryDate: "2024-07-10",
      daysUntilExpiry: 7,
      urgency: "low",
      price: 5.49,
      suggestedDiscount: 0,
      location: "Aisle 12-B"
    },
    {
      id: 5,
      name: "Strawberries 1lb",
      category: "Produce",
      quantity: 23,
      expiryDate: "2024-07-06",
      daysUntilExpiry: 3,
      urgency: "high",
      price: 4.99,
      suggestedDiscount: 25,
      location: "Produce Section"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCountdownColor = (days: number) => {
    if (days <= 1) return 'text-red-600';
    if (days <= 3) return 'text-orange-600';
    if (days <= 7) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'expiring' && item.daysUntilExpiry <= 3) ||
                         (filterBy === 'dairy' && item.category === 'Dairy') ||
                         (filterBy === 'produce' && item.category === 'Produce') ||
                         (filterBy === 'bakery' && item.category === 'Bakery');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Real-Time Inventory</h1>
            <p className="text-muted-foreground text-lg">Track and manage products with intelligent expiry monitoring</p>
          </div>
          <Button className="gradient-primary text-white flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-red-600">Critical (≤1 day)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">3</div>
              <p className="text-xs text-muted-foreground">Items need immediate action</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-600">High Priority (2-3 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">7</div>
              <p className="text-xs text-muted-foreground">Items expiring soon</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600">Medium Priority (4-7 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">12</div>
              <p className="text-xs text-muted-foreground">Items to monitor</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-600">Good Condition (&gt;7 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">156</div>
              <p className="text-xs text-muted-foreground">Items in good condition</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-48 h-12">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="expiring">Expiring Soon</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="produce">Produce</SelectItem>
              <SelectItem value="bakery">Bakery</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button 
              variant={viewMode === "grid" ? "default" : "outline"} 
              onClick={() => setViewMode("grid")}
              size="sm"
            >
              Grid
            </Button>
            <Button 
              variant={viewMode === "list" ? "default" : "outline"} 
              onClick={() => setViewMode("list")}
              size="sm"
            >
              List
            </Button>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-300 border-2">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <CardDescription>{item.category} • {item.location}</CardDescription>
                  </div>
                  <Badge className={`${getUrgencyColor(item.urgency)} border`}>
                    {item.urgency}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Quantity and Price */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold">{item.quantity}</div>
                    <div className="text-sm text-muted-foreground">units in stock</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold">${item.price}</div>
                    {item.suggestedDiscount > 0 && (
                      <div className="text-sm text-emerald-600">
                        -{item.suggestedDiscount}% suggested
                      </div>
                    )}
                  </div>
                </div>

                {/* Expiry Countdown */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Expires in:</span>
                    <span className={`font-bold ${getCountdownColor(item.daysUntilExpiry)}`}>
                      {item.daysUntilExpiry} day{item.daysUntilExpiry !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <Progress 
                    value={Math.max(0, Math.min(100, (14 - item.daysUntilExpiry) / 14 * 100))} 
                    className="h-2"
                  />
                  
                  <div className="text-xs text-muted-foreground">
                    Expiry Date: {new Date(item.expiryDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {item.suggestedDiscount > 0 && (
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <CircleDollarSign className="h-4 w-4 mr-1" />
                      Discount {item.suggestedDiscount}%
                    </Button>
                  )}
                  
                  {item.urgency === 'critical' || item.urgency === 'high' ? (
                    <Button size="sm" variant="outline" className="flex-1">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      Redistribute
                    </Button>
                  ) : null}
                </div>

                {/* AI Recommendations */}
                {item.urgency === 'critical' && (
                  <div className="bg-red-50 dark:bg-red-950 p-3 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center gap-2 text-red-800 dark:text-red-200 text-sm font-medium mb-1">
                      <Bell className="h-4 w-4" />
                      AI Recommendation
                    </div>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Apply 50% discount immediately or donate to nearest food bank within 4 hours.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
