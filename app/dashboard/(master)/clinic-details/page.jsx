'use client';
import React, { useState } from 'react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, RefreshCcw, PlusCircle, Eye, Pencil, Trash2, ArrowLeft } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";

// Sample clinic data
const initialClinicData = [
  {
    id: "DOC00161",
    clinicName: "Sunrise Medical Clinic",
    doctorName: "Dr. Rajesh Kumar",
    city: "Mumbai",
    mobile1: "9876543210",
    email: "sunrise@clinic.com",
    clinicType: "Clinic",
    status: "Active"
  },
  {
    id: "DOC00162",
    clinicName: "Health Plus Centre",
    doctorName: "Dr. Priya Sharma",
    city: "Delhi",
    mobile1: "9876543211",
    email: "healthplus@clinic.com",
    clinicType: "Collection Centre",
    status: "Active"
  },
  {
    id: "DOC00163",
    clinicName: "Care Diagnostic Lab",
    doctorName: "Dr. Amit Patel",
    city: "Ahmedabad",
    mobile1: "9876543212",
    email: "carediag@lab.com",
    clinicType: "Hospital",
    status: "Inactive"
  }
];

const ClinicDetailsPage = () => {
  const [searchDoctor, setSearchDoctor] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table', 'view', 'add', 'edit'
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [clinicData, setClinicData] = useState(initialClinicData);
  
  // Clinic Details Form State
  const [formData, setFormData] = useState({
    clinicId: "DOC00161",
    clinicName: '',
    drDropdown: '',
    enterClinicName: '',
    collectionCentre: '',
    houseApartment: '',
    street: '',
    city: '',
    landmark: '',
    officeLandline: '',
    mobile1: '',
    mobile2: '',
    email: '',
    tinNo: '',
    cstNo: '',
    username: '',
    password: '',
    
    // Doctors Details
    contactName: '',
    contactNo: '',
    docUsername: '',
    docPassword: '',
    docOptions: '',
    
    // Preferences
    clinicStatus: 'Active',
    clinicType: 'Clinic',
    openingBalance: '',
    invoiceType: 'Cash',
    creditLimit: '',
    creditDays: '',
    inDate: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      clinicId: "DOC00161",
      clinicName: '',
      drDropdown: '',
      enterClinicName: '',
      collectionCentre: '',
      houseApartment: '',
      street: '',
      city: '',
      landmark: '',
      officeLandline: '',
      mobile1: '',
      mobile2: '',
      email: '',
      tinNo: '',
      cstNo: '',
      username: '',
      password: '',
      contactName: '',
      contactNo: '',
      docUsername: '',
      docPassword: '',
      docOptions: '',
      clinicStatus: 'Active',
      clinicType: 'Clinic',
      openingBalance: '',
      invoiceType: 'Cash',
      creditLimit: '',
      creditDays: '',
      inDate: ''
    });
    toast.success("Form Reset");
  };

  const handleSave = () => {
    if (!formData.enterClinicName && !formData.clinicName) {
      toast.error("Please enter Clinic Name");
      return;
    }
    if (!formData.city) {
      toast.error("City is required");
      return;
    }

    console.log("Saving Data:", formData);
    
    if (viewMode === 'add') {
      // Add new clinic
      const newClinic = {
        id: formData.clinicId,
        clinicName: formData.enterClinicName || formData.clinicName,
        doctorName: formData.drDropdown ? `Dr. ${formData.drDropdown}` : '',
        city: formData.city,
        mobile1: formData.mobile1,
        email: formData.email,
        clinicType: formData.clinicType,
        status: formData.clinicStatus
      };
      setClinicData([...clinicData, newClinic]);
      toast.success("Clinic Added Successfully");
    } else if (viewMode === 'edit') {
      // Update existing clinic
      setClinicData(clinicData.map(c => 
        c.id === formData.clinicId ? {
          ...c,
          clinicName: formData.enterClinicName || formData.clinicName,
          doctorName: formData.drDropdown ? `Dr. ${formData.drDropdown}` : c.doctorName,
          city: formData.city,
          mobile1: formData.mobile1,
          email: formData.email,
          clinicType: formData.clinicType,
          status: formData.clinicStatus
        } : c
      ));
      toast.success("Clinic Updated Successfully");
    }
    
    setViewMode('table');
    handleReset();
  };

  // Table action handlers
  const handleView = (clinic) => {
    setSelectedClinic(clinic);
    setFormData({
      ...formData,
      clinicId: clinic.id,
      enterClinicName: clinic.clinicName,
      city: clinic.city,
      mobile1: clinic.mobile1,
      email: clinic.email,
      clinicType: clinic.clinicType,
      clinicStatus: clinic.status
    });
    setViewMode('view');
  };

  const handleEdit = (clinic) => {
    setSelectedClinic(clinic);
    setFormData({
      ...formData,
      clinicId: clinic.id,
      enterClinicName: clinic.clinicName,
      city: clinic.city,
      mobile1: clinic.mobile1,
      email: clinic.email,
      clinicType: clinic.clinicType,
      clinicStatus: clinic.status
    });
    setViewMode('edit');
  };

  const handleDelete = (clinicId) => {
    if (confirm("Are you sure you want to delete this clinic?")) {
      setClinicData(clinicData.filter(c => c.id !== clinicId));
      toast.success("Clinic Deleted Successfully");
    }
  };

  const handleAddNew = () => {
    handleReset();
    // Generate new clinic ID
    const newId = `DOC00${String(clinicData.length + 161).slice(-3)}`;
    setFormData(prev => ({ ...prev, clinicId: newId }));
    setViewMode('add');
    setSelectedClinic(null);
  };

  const handleBackToTable = () => {
    setViewMode('table');
    setSelectedClinic(null);
    handleReset();
  };

  // Filter clinics based on search
  const filteredClinics = clinicData.filter(clinic =>
    clinic.clinicName?.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    clinic.id?.toLowerCase().includes(searchDoctor.toLowerCase()) ||
    clinic.city?.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto space-y-6 bg-background min-h-screen font-sans">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 border-b pb-2">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Clinic Details</h1>
        {viewMode !== 'table' && (
          <Button 
            variant="outline" 
            className="rounded-none border-border"
            onClick={handleBackToTable}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
          </Button>
        )}
        <div className="text-xs text-red-500 font-mono">* indicates mandatory</div>
      </div>

      {/* Table View - Show First */}
      {viewMode === 'table' && (
        <>
          {/* Search and Add Section */}
          <div className="border border-border p-6 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="w-full md:w-auto">
                <Label className="text-sm font-medium block mb-1">Search Clinic:</Label>
                <div className="flex gap-2 w-full max-w-md">
                  <Input 
                    placeholder="Search..." 
                    className="rounded-none border-border bg-background h-9 text-xs"
                    value={searchDoctor}
                    onChange={(e) => setSearchDoctor(e.target.value)}
                  />
                  <Button className="bg-main hover:bg-mainhvr cursor-pointer text-primary-foreground rounded-none px-6 h-9 text-xs font-bold uppercase">
                    <Search className="w-4 h-4 mr-1" /> Search
                  </Button>
                  <Button variant="outline" className="rounded-none h-9 border-gray-300" onClick={() => setSearchDoctor('')}>
                    <RefreshCcw className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>
              <Button 
                className="bg-main hover:bg-mainhvr cursor-pointer text-primary-foreground rounded-none px-6 h-9 text-xs font-bold uppercase"
                onClick={handleAddNew}
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div className="border border-border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-xs font-bold">Clinic ID</TableHead>
                  <TableHead className="text-xs font-bold">Clinic Name</TableHead>
                  <TableHead className="text-xs font-bold">Doctor Name</TableHead>
                  <TableHead className="text-xs font-bold">City</TableHead>
                  <TableHead className="text-xs font-bold">Mobile</TableHead>
                  <TableHead className="text-xs font-bold">Email</TableHead>
                  <TableHead className="text-xs font-bold">Type</TableHead>
                  <TableHead className="text-xs font-bold">Status</TableHead>
                  <TableHead className="text-xs font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClinics.length > 0 ? (
                  filteredClinics.map((clinic) => (
                    <TableRow key={clinic.id}>
                      <TableCell className="text-xs">{clinic.id}</TableCell>
                      <TableCell className="text-xs font-medium">{clinic.clinicName}</TableCell>
                      <TableCell className="text-xs">{clinic.doctorName}</TableCell>
                      <TableCell className="text-xs">{clinic.city}</TableCell>
                      <TableCell className="text-xs">{clinic.mobile1}</TableCell>
                      <TableCell className="text-xs">{clinic.email}</TableCell>
                      <TableCell className="text-xs">{clinic.clinicType}</TableCell>
                      <TableCell className="text-xs">
                        <span className={`px-2 py-1 rounded-full text-xs ${clinic.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {clinic.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 rounded-none border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleView(clinic)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 rounded-none border-green-300 text-green-600 hover:bg-green-50"
                            onClick={() => handleEdit(clinic)}
                          >
                            <Pencil className="w-3 h-3" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 rounded-none border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(clinic.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-xs py-8 text-muted-foreground">
                      No clinics found. Click "Add New" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* Form View - Add/Edit/View Mode */}
      {(viewMode === 'add' || viewMode === 'edit' || viewMode === 'view') && (
        <>
          {/* Mode Title */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {viewMode === 'add' && 'Adding New Clinic'}
              {viewMode === 'edit' && 'Editing Clinic'}
              {viewMode === 'view' && 'Viewing Clinic Details'}
            </span>
          </div>

          {/* Main Form */}
          <div className="border border-border p-6 space-y-6 shadow-sm mb-10">
            <div className="text-sm font-bold text-foreground tracking-wider">
              Clinic Information
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Clinic ID</Label>
                  <Input 
                    className="col-span-2 rounded-none border-border bg-muted"
                    value={formData.clinicId}
                    readOnly
                    disabled={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-start gap-2">
                  <Label className="text-sm font-medium">Clinic Name</Label>
                  <div className="col-span-2 space-y-2">
                    {viewMode === 'view' ? (
                      <Input 
                        className="rounded-none border-border bg-muted"
                        value={formData.enterClinicName}
                        readOnly
                      />
                    ) : (
                      <>
                        <Select value={formData.drDropdown} onValueChange={(v) => handleChange('drDropdown', v)}>
                          <SelectTrigger className="rounded-none border-border">
                            <SelectValue placeholder="Dr." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="dr">Dr.</SelectItem>
                            <SelectItem value="prof">Prof.</SelectItem>
                            <SelectItem value="mr">Mr.</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          placeholder="Enter Clinic Name"
                          className="rounded-none border-border"
                          value={formData.enterClinicName}
                          onChange={(e) => handleChange('enterClinicName', e.target.value)}
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Collection Centre</Label>
                  {viewMode === 'view' ? (
                    <Input 
                      className="col-span-2 rounded-none border-border bg-muted"
                      value={formData.collectionCentre || 'N/A'}
                      readOnly
                    />
                  ) : (
                    <Select value={formData.collectionCentre} onValueChange={(v) => handleChange('collectionCentre', v)}>
                      <SelectTrigger className="col-span-2 rounded-none border-gray-300">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centre1">Main Centre</SelectItem>
                        <SelectItem value="centre2">Branch Centre</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">House/Apartment Name</Label>
                  {viewMode === 'view' ? (
                    <Input 
                      className="col-span-2 rounded-none border-border bg-muted"
                      value={formData.houseApartment || 'N/A'}
                      readOnly
                    />
                  ) : (
                    <Select value={formData.houseApartment} onValueChange={(v) => handleChange('houseApartment', v)}>
                      <SelectTrigger className="col-span-2 rounded-none border-gray-300">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bldg1">Building 1</SelectItem>
                        <SelectItem value="bldg2">Building 2</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Street</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.street}
                    onChange={(e) => handleChange('street', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">City<span className="text-red-500 ml-0.5">*</span></Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Land Mark</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.landmark}
                    onChange={(e) => handleChange('landmark', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Office Landline</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.officeLandline}
                    onChange={(e) => handleChange('officeLandline', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Mobile 1</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Enter MobileNo"
                    value={formData.mobile1}
                    onChange={(e) => handleChange('mobile1', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Mobile 2</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.mobile2}
                    onChange={(e) => handleChange('mobile2', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">TIN No</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.tinNo}
                    onChange={(e) => handleChange('tinNo', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">CST No</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.cstNo}
                    onChange={(e) => handleChange('cstNo', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Username</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="grid grid-cols-3 items-center gap-2">
                  <Label className="text-sm font-medium">Password</Label>
                  <Input 
                    className="col-span-2 rounded-none border-gray-300"
                    type="password"
                    placeholder="Input Box"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>
              </div>
            </div>

            {/* Doctors Details Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="text-sm font-bold text-black tracking-wider mb-4">
                Doctors Details
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <Label className="text-sm font-medium block mb-1">Contact Name</Label>
                  <Input 
                    className="rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.contactName}
                    onChange={(e) => handleChange('contactName', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium block mb-1">Contact No</Label>
                  <Input 
                    className="rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.contactNo}
                    onChange={(e) => handleChange('contactNo', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium block mb-1">User Name</Label>
                  <Input 
                    className="rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.docUsername}
                    onChange={(e) => handleChange('docUsername', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium block mb-1">Password</Label>
                  <Input 
                    className="rounded-none border-gray-300"
                    type="password"
                    placeholder="Input Box"
                    value={formData.docPassword}
                    onChange={(e) => handleChange('docPassword', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium block mb-1">Options</Label>
                  {viewMode === 'view' ? (
                    <Input 
                      className="rounded-none border-border bg-muted"
                      value={formData.docOptions || 'N/A'}
                      readOnly
                    />
                  ) : (
                    <Select value={formData.docOptions} onValueChange={(v) => handleChange('docOptions', v)}>
                      <SelectTrigger className="rounded-none border-gray-300">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="pt-6 border-t border-gray-200">
              <div className="text-sm font-bold text-black tracking-wider mb-4">
                Preferences
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">Clinic Status</Label>
                  {viewMode === 'view' ? (
                    <span className={`px-2 py-1 rounded-full text-xs ${formData.clinicStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {formData.clinicStatus}
                    </span>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-sm">{formData.clinicStatus}</span>
                      <div 
                        className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${formData.clinicStatus === 'Active' ? 'bg-green-600' : 'bg-gray-300'}`}
                        onClick={() => handleChange('clinicStatus', formData.clinicStatus === 'Active' ? 'Inactive' : 'Active')}
                      >
                        <div className={`bg-white w-3 h-3 rounded-full shadow-sm transition-transform ${formData.clinicStatus === 'Active' ? 'translate-x-5' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">Clinic Type</Label>
                  {viewMode === 'view' ? (
                    <Input 
                      className="w-40 rounded-none border-border bg-muted"
                      value={formData.clinicType}
                      readOnly
                    />
                  ) : (
                    <Select value={formData.clinicType} onValueChange={(v) => handleChange('clinicType', v)}>
                      <SelectTrigger className="w-40 rounded-none border-gray-300">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Clinic">Clinic</SelectItem>
                        <SelectItem value="Collection Centre">Collection Centre</SelectItem>
                        <SelectItem value="Hospital">Hospital</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">Opening Balance (QAR)</Label>
                  <Input 
                    className="w-32 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.openingBalance}
                    onChange={(e) => handleChange('openingBalance', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">Invoice Type</Label>
                  {viewMode === 'view' ? (
                    <span className="text-sm">{formData.invoiceType}</span>
                  ) : (
                    <RadioGroup 
                      value={formData.invoiceType} 
                      onValueChange={(v) => handleChange('invoiceType', v)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-1">
                        <RadioGroupItem value="Cash" id="cash" />
                        <Label htmlFor="cash">Cash</Label>
                      </div>
                      <div className="flex items-center gap-1">
                        <RadioGroupItem value="Tax" id="tax" />
                        <Label htmlFor="tax">Tax</Label>
                      </div>
                    </RadioGroup>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">Credit limit (QAR)</Label>
                  <Input 
                    className="w-32 rounded-none border-gray-300"
                    placeholder="Input Box"
                    value={formData.creditLimit}
                    onChange={(e) => handleChange('creditLimit', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">Credit days</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">4 Mar 2026</span>
                    <Input 
                      className="w-32 rounded-none border-gray-300"
                      placeholder="Input Box"
                      value={formData.creditDays}
                      onChange={(e) => handleChange('creditDays', e.target.value)}
                      readOnly={viewMode === 'view'}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Label className="text-sm font-medium">In Date</Label>
                  <Input 
                    className="w-40 rounded-none border-border"
                    type="date"
                    value={formData.inDate}
                    onChange={(e) => handleChange('inDate', e.target.value)}
                    readOnly={viewMode === 'view'}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {viewMode !== 'view' && (
              <div className="flex gap-3 pt-6 border-t">
                <Button className="rounded-none bg-main hover:bg-mainhvr text-primary-foreground px-8" onClick={handleSave}>
                  <PlusCircle className="w-4 h-4 mr-2" /> {viewMode === 'add' ? 'Add' : 'Update'}
                </Button>
                <Button variant="outline" className="rounded-none border-border px-8" onClick={handleReset}>
                  <RefreshCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>
            )}

            {viewMode === 'view' && (
              <div className="flex gap-3 pt-6 border-t">
                <Button className="rounded-none bg-main hover:bg-mainhvr text-primary-foreground px-8" onClick={() => setViewMode('edit')}>
                  <Pencil className="w-4 h-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" className="rounded-none border-border px-8" onClick={handleBackToTable}>
                  Back to List
                </Button>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-2">* Required fields</p>
        </>
      )}
    </div>
  );
};

export default ClinicDetailsPage;
