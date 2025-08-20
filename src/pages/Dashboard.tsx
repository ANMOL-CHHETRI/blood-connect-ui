import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Droplets, 
  Calendar, 
  TrendingUp, 
  Clock, 
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app would come from backend
  const stats = {
    totalDonors: 1247,
    availableUnits: 89,
    todayAppointments: 12,
    urgentRequests: 3
  };

  const recentDonations = [
    { id: 1, donor: "John Smith", bloodType: "A+", date: "2024-01-15", units: 1 },
    { id: 2, donor: "Sarah Johnson", bloodType: "O-", date: "2024-01-14", units: 1 },
    { id: 3, donor: "Mike Chen", bloodType: "B+", date: "2024-01-13", units: 1 },
    { id: 4, donor: "Emily Davis", bloodType: "AB+", date: "2024-01-12", units: 1 },
  ];

  const urgentRequests = [
    { id: 1, bloodType: "O-", units: 5, hospital: "City General", priority: "Critical" },
    { id: 2, bloodType: "A+", units: 3, hospital: "St. Mary's", priority: "High" },
    { id: 3, bloodType: "B-", units: 2, hospital: "Memorial Hospital", priority: "Urgent" },
  ];

  const bloodStock = [
    { type: "A+", units: 15, status: "normal" },
    { type: "A-", units: 8, status: "low" },
    { type: "B+", units: 12, status: "normal" },
    { type: "B-", units: 4, status: "critical" },
    { type: "AB+", units: 6, status: "low" },
    { type: "AB-", units: 3, status: "critical" },
    { type: "O+", units: 20, status: "good" },
    { type: "O-", units: 2, status: "critical" },
  ];

  const getStockStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive';
      case 'low': return 'bg-medical-warning';
      case 'normal': return 'bg-medical-info';
      case 'good': return 'bg-medical-success';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-medical-bg">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Monitor blood donation activities and inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDonors}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Units</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableUnits}</div>
              <p className="text-xs text-muted-foreground">
                Across all blood types
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">
                <Clock className="inline h-3 w-3 mr-1" />
                Next at 2:00 PM
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Requests</CardTitle>
              <TrendingUp className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.urgentRequests}</div>
              <p className="text-xs text-muted-foreground">
                Require immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Blood Stock Status */}
          <Card>
            <CardHeader>
              <CardTitle>Blood Stock Status</CardTitle>
              <CardDescription>Current inventory levels by blood type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {bloodStock.map((stock) => (
                  <div key={stock.type} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStockStatusColor(stock.status)}`} />
                      <span className="font-medium">{stock.type}</span>
                    </div>
                    <Badge variant="outline">{stock.units} units</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Urgent Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Urgent Requests</CardTitle>
              <CardDescription>Blood requests requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="destructive">{request.priority}</Badge>
                        <span className="font-medium">{request.bloodType}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <MapPin className="inline h-3 w-3 mr-1" />
                        {request.hospital}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{request.units} units</div>
                      <Button size="sm" className="mt-1">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Donations */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Latest blood donations received</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div key={donation.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary p-2 rounded-full">
                      <Droplets className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{donation.donor}</div>
                      <div className="text-sm text-muted-foreground">
                        {donation.bloodType} • {donation.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{donation.units} unit</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;