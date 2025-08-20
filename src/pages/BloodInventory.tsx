import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Droplets, 
  Plus, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Calendar,
  Beaker
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BloodInventory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBloodType, setFilterBloodType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock inventory data
  const [inventory, setInventory] = useState([
    { id: 1, donorId: "D001", bloodType: "A+", units: 1, collectionDate: "2024-01-15", expiryDate: "2024-02-15", status: "available", location: "Bank-A", testResults: "passed" },
    { id: 2, donorId: "D002", bloodType: "O-", units: 1, collectionDate: "2024-01-14", expiryDate: "2024-02-14", status: "available", location: "Bank-B", testResults: "passed" },
    { id: 3, donorId: "D003", bloodType: "B+", units: 1, collectionDate: "2024-01-13", expiryDate: "2024-02-13", status: "reserved", location: "Bank-A", testResults: "passed" },
    { id: 4, donorId: "D004", bloodType: "AB-", units: 1, collectionDate: "2024-01-12", expiryDate: "2024-02-12", status: "expired", location: "Bank-C", testResults: "passed" },
    { id: 5, donorId: "D005", bloodType: "A-", units: 1, collectionDate: "2024-01-11", expiryDate: "2024-02-11", status: "used", location: "Bank-B", testResults: "passed" },
    { id: 6, donorId: "D006", bloodType: "O+", units: 1, collectionDate: "2024-01-10", expiryDate: "2024-02-10", status: "testing", location: "Lab-1", testResults: "pending" },
  ]);

  const [newUnit, setNewUnit] = useState({
    donorId: "",
    bloodType: "",
    units: 1,
    collectionDate: "",
    location: "",
  });

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const locations = ["Bank-A", "Bank-B", "Bank-C", "Lab-1", "Lab-2"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-medical-success text-white';
      case 'reserved': return 'bg-medical-warning text-white';
      case 'used': return 'bg-medical-info text-white';
      case 'expired': return 'bg-destructive text-white';
      case 'testing': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'reserved': return <Calendar className="h-4 w-4" />;
      case 'used': return <Droplets className="h-4 w-4" />;
      case 'expired': return <XCircle className="h-4 w-4" />;
      case 'testing': return <Beaker className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.donorId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.bloodType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBloodType = filterBloodType === "all" || item.bloodType === filterBloodType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    
    return matchesSearch && matchesBloodType && matchesStatus;
  });

  const handleAddUnit = () => {
    if (!newUnit.donorId || !newUnit.bloodType || !newUnit.collectionDate || !newUnit.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const expiryDate = new Date(newUnit.collectionDate);
    expiryDate.setDate(expiryDate.getDate() + 35); // 35 days shelf life

    const unit = {
      id: Math.max(...inventory.map(i => i.id)) + 1,
      ...newUnit,
      expiryDate: expiryDate.toISOString().split('T')[0],
      status: "testing",
      testResults: "pending"
    };

    setInventory([unit, ...inventory]);
    setNewUnit({
      donorId: "",
      bloodType: "",
      units: 1,
      collectionDate: "",
      location: "",
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Unit Added",
      description: `Blood unit ${unit.id} has been added to inventory.`
    });
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setInventory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Unit status has been updated to ${newStatus}.`
    });
  };

  // Calculate summary stats
  const totalUnits = inventory.filter(item => item.status === 'available').length;
  const criticalTypes = bloodTypes.filter(type => {
    const count = inventory.filter(item => item.bloodType === type && item.status === 'available').length;
    return count < 3;
  });
  const expiringUnits = inventory.filter(item => {
    const expiry = new Date(item.expiryDate);
    const today = new Date();
    const daysToExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysToExpiry <= 7 && item.status === 'available';
  }).length;

  return (
    <div className="min-h-screen bg-medical-bg">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Blood Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage blood unit inventory</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Units</CardTitle>
              <Droplets className="h-4 w-4 text-medical-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
              <p className="text-xs text-muted-foreground">Ready for use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{criticalTypes.length}</div>
              <p className="text-xs text-muted-foreground">Blood types low stock</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <Calendar className="h-4 w-4 text-medical-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-warning">{expiringUnits}</div>
              <p className="text-xs text-muted-foreground">Within 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by donor ID or blood type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={filterBloodType} onValueChange={setFilterBloodType}>
            <SelectTrigger className="w-full sm:w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Blood Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {bloodTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="reserved">Reserved</SelectItem>
              <SelectItem value="used">Used</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Blood Unit</DialogTitle>
                <DialogDescription>
                  Enter the details for the new blood unit donation.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="donorId" className="text-right">Donor ID</Label>
                  <Input
                    id="donorId"
                    value={newUnit.donorId}
                    onChange={(e) => setNewUnit({...newUnit, donorId: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bloodType" className="text-right">Blood Type</Label>
                  <Select value={newUnit.bloodType} onValueChange={(value) => setNewUnit({...newUnit, bloodType: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="collectionDate" className="text-right">Collection Date</Label>
                  <Input
                    id="collectionDate"
                    type="date"
                    value={newUnit.collectionDate}
                    onChange={(e) => setNewUnit({...newUnit, collectionDate: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Select value={newUnit.location} onValueChange={(value) => setNewUnit({...newUnit, location: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUnit}>Add Unit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Units</CardTitle>
            <CardDescription>
              {filteredInventory.length} units found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unit ID</TableHead>
                    <TableHead>Donor ID</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Collection Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">#{unit.id}</TableCell>
                      <TableCell>{unit.donorId}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{unit.bloodType}</Badge>
                      </TableCell>
                      <TableCell>{unit.collectionDate}</TableCell>
                      <TableCell>{unit.expiryDate}</TableCell>
                      <TableCell>{unit.location}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(unit.status)}>
                          {getStatusIcon(unit.status)}
                          <span className="ml-1 capitalize">{unit.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={unit.status}
                          onValueChange={(value) => handleStatusChange(unit.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="testing">Testing</SelectItem>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="reserved">Reserved</SelectItem>
                            <SelectItem value="used">Used</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BloodInventory;