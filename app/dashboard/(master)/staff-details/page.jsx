'use client';
import React, { useState } from 'react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, RefreshCcw, PlusCircle, Mail, Eye, Pencil, Trash2 } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

// Sample staff data for the table
const initialStaffData = [
  { id: 1, staffCode: 'ST00001', name: 'Dr. John Smith', department: 'IT Department', mobile: '9876543210', email: 'john@example.com', status: 'Active' },
  { id: 2, staffCode: 'ST00002', name: 'Mr. Ahmed Khan', department: 'HR', mobile: '9876543211', email: 'ahmed@example.com', status: 'Active' },
  { id: 3, staffCode: 'ST00003', name: 'Dr. Sarah Johnson', department: 'IT Department', mobile: '9876543212', email: 'sarah@example.com', status: 'Inactive' },
  { id: 4, staffCode: 'ST00004', name: 'Mr. Ravi Patel', department: 'IT Department', mobile: '9876543213', email: 'ravi@example.com', status: 'Active' },
];

const StaffRegistrationPage = () => {
  const [showTable, setShowTable] = useState(true);
  const [staffData, setStaffData] = useState(initialStaffData);
  const [searchStaff, setSearchStaff] = useState('');
  const [viewMode, setViewMode] = useState(null); // null, 'view', 'edit', 'add'
  const [selectedStaff, setSelectedStaff] = useState(null);
  
  const [formData, setFormData] = useState({
    staffCode: "ST00044",
    salutation: 'Dr.',
    staffName: '',
    department: '',
    qualification: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    email: '',
    area: '',
    city: '',
    pinCode: '',
    status: 'Active',
    state: '',
    residenceLandline: '',
    mobile1: '',
    mobile2: '',
    fax: '',
    dateOfBirth: '2026-03-04',
    maritalStatus: '',
    gender: '',
    username: 'dfinelab_dlms',
    password: 'dfinelab_dlms',
    startDate: '2026-03-04',
    expiryDate: '2026-03-04'
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReset = () => {
    setFormData({
      staffCode: "ST00044",
      salutation: 'Dr.',
      staffName: '',
      department: '',
      qualification: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      email: '',
      area: '',
      city: '',
      pinCode: '',
      status: 'Active',
      state: '',
      residenceLandline: '',
      mobile1: '',
      mobile2: '',
      fax: '',
      dateOfBirth: '2026-03-04',
      maritalStatus: '',
      gender: '',
      username: 'dfinelab_dlms',
      password: 'dfinelab_dlms',
      startDate: '2026-03-04',
      expiryDate: '2026-03-04'
    });
    toast.success("Form Reset");
  };

  const handleSave = () => {
    if (!formData.staffName || !formData.mobile1) {
      toast.error("Please fill mandatory fields");
      return;
    }
    toast.success("Staff Registered Successfully");
    setShowTable(true);
    setViewMode(null);
  };

  const handleAddNew = () => {
    setFormData({
      staffCode: "ST00044",
      salutation: 'Dr.',
      staffName: '',
      department: '',
      qualification: '',
      addressLine1: '',
      addressLine2: '',
      country: '',
      email: '',
      area: '',
      city: '',
      pinCode: '',
      status: 'Active',
      state: '',
      residenceLandline: '',
      mobile1: '',
      mobile2: '',
      fax: '',
      dateOfBirth: '2026-03-04',
      maritalStatus: '',
      gender: '',
      username: 'dfinelab_dlms',
      password: 'dfinelab_dlms',
      startDate: '2026-03-04',
      expiryDate: '2026-03-04'
    });
    setSelectedStaff(null);
    setShowTable(false);
    setViewMode('add');
  };

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setFormData({
      staffCode: staff.staffCode,
      salutation: staff.name.split(' ')[0],
      staffName: staff.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/, ''),
      department: staff.department === 'IT Department' ? 'it' : 'hr',
      qualification: '',
      addressLine1: '',
      addressLine2: '',
      country: 'qatar',
      email: staff.email,
      area: 'area1',
      city: '',
      pinCode: '',
      status: staff.status,
      state: '',
      residenceLandline: '',
      mobile1: staff.mobile,
      mobile2: '',
      fax: '',
      dateOfBirth: '2026-03-04',
      maritalStatus: '',
      gender: '',
      username: 'dfinelab_dlms',
      password: 'dfinelab_dlms',
      startDate: '2026-03-04',
      expiryDate: '2026-03-04'
    });
    setShowTable(false);
    setViewMode('view');
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setFormData({
      staffCode: staff.staffCode,
      salutation: staff.name.split(' ')[0],
      staffName: staff.name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s*/, ''),
      department: staff.department === 'IT Department' ? 'it' : 'hr',
      qualification: '',
      addressLine1: '',
      addressLine2: '',
      country: 'qatar',
      email: staff.email,
      area: 'area1',
      city: '',
      pinCode: '',
      status: staff.status,
      state: '',
      residenceLandline: '',
      mobile1: staff.mobile,
      mobile2: '',
      fax: '',
      dateOfBirth: '2026-03-04',
      maritalStatus: '',
      gender: '',
      username: 'dfinelab_dlms',
      password: 'dfinelab_dlms',
      startDate: '2026-03-04',
      expiryDate: '2026-03-04'
    });
    setShowTable(false);
    setViewMode('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaffData(staffData.filter(s => s.id !== id));
      toast.success("Staff deleted successfully");
    }
  };

  const handleBackToTable = () => {
    setShowTable(true);
    setViewMode(null);
    setSelectedStaff(null);
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto space-y-6 bg-background min-h-screen font-sans">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 border-b pb-2">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Staff Registration</h1>
        {!showTable && (
          <Button 
            variant="outline" 
            className="rounded-none border-gray-300"
            onClick={handleBackToTable}
          >
            Back to List
          </Button>
        )}
      </div>

      {/* Show Table First */}
      {showTable ? (
        <>
          {/* Staff Search Section */}
          <div className="border border-gray-200 p-6 space-y-4 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="w-full md:w-auto">
                <Label className="text-sm font-medium block mb-1">Enter Staff Name:</Label>
                <div className="flex gap-2 w-full max-w-md">
                  <Input 
                    placeholder="Search..." 
                    className="rounded-none border-border bg-background h-9 text-xs" 
                    value={searchStaff}
                    onChange={(e) => setSearchStaff(e.target.value)}
                  />
                  <Button className="bg-main hover:bg-mainhvr cursor-pointer text-primary-foreground rounded-none px-6 h-9 text-xs font-bold uppercase">Select</Button>
                  <Button variant="outline" className="rounded-none h-9 border-gray-300"><RefreshCcw className="w-4 h-4 text-gray-600" /></Button>
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

          {/* Staff Table */}
          <div className="border border-gray-200 p-4 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Staff Code</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Staff Name</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Department</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Mobile</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Email</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Status</th>
                    <th className="px-4 py-2 text-left font-medium text-gray-600 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffData.filter(s => s.name.toLowerCase().includes(searchStaff.toLowerCase()) || s.staffCode.toLowerCase().includes(searchStaff.toLowerCase())).map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50 border-b">
                      <td className="px-4 py-2">{staff.staffCode}</td>
                      <td className="px-4 py-2">{staff.name}</td>
                      <td className="px-4 py-2">{staff.department}</td>
                      <td className="px-4 py-2">{staff.mobile}</td>
                      <td className="px-4 py-2">{staff.email}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 text-xs rounded ${staff.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {staff.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 rounded-none border-blue-300 text-blue-600 hover:bg-blue-50"
                            onClick={() => handleView(staff)}
                          >
                            <Eye className="w-3 h-3 mr-1" /> View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 rounded-none border-green-300 text-green-600 hover:bg-green-50"
                            onClick={() => handleEdit(staff)}
                          >
                            <Pencil className="w-3 h-3 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 rounded-none border-red-300 text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(staff.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1" /> Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Main Form */}
          <div className="border border-gray-200 p-6 space-y-6 shadow-sm mb-10">
            <div className="text-sm font-bold text-black tracking-wider">
              {viewMode === 'view' ? 'Staff Details (View Mode)' : viewMode === 'edit' ? 'Staff Details (Edit Mode)' : 'Staff Details'}
            </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
          {/* Left Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Staff Code</Label>
              <Input className="col-span-2 rounded-none border-border bg-muted" value={formData.staffCode} readOnly />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Department</Label>
              <Select value={formData.department} onValueChange={(v) => handleChange('department', v)} disabled={viewMode === 'view'}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT Department</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Qualification</Label>
              <Select value={formData.qualification} onValueChange={(v) => handleChange('qualification', v)} disabled={viewMode === 'view'}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="mbbs">MBBS</SelectItem></SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Address Line 2</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.addressLine2} onChange={(e) => handleChange('addressLine2', e.target.value)} readOnly={viewMode === 'view'} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Email</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} readOnly={viewMode === 'view'} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">City</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} readOnly={viewMode === 'view'} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(v) => handleChange('status', v)} disabled={viewMode === 'view'}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Username<span className="text-red-500 ml-0.5">*</span></Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.username} onChange={(e) => handleChange('username', e.target.value)} readOnly={viewMode === 'view'} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-start gap-2">
              <Label className="text-sm font-medium">Staff Name<span className="text-red-500 ml-0.5">*</span></Label>
              <div className="col-span-2 space-y-2">
                <Select value={formData.salutation} onValueChange={(v) => handleChange('salutation', v)} disabled={viewMode === 'view'}>
                  <SelectTrigger className="rounded-none border-gray-300"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr.">Dr.</SelectItem>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Enter Staff Name" className="rounded-none border-gray-300" value={formData.staffName} onChange={(e) => handleChange('staffName', e.target.value)} readOnly={viewMode === 'view'} />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Address Line 1</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.addressLine1} onChange={(e) => handleChange('addressLine1', e.target.value)} readOnly={viewMode === 'view'} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Country</Label>
              <Select value={formData.country} onValueChange={(v) => handleChange('country', v)} disabled={viewMode === 'view'}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="qatar">Qatar</SelectItem></SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Area</Label>
              <Select value={formData.area} onValueChange={(v) => handleChange('area', v)} disabled={viewMode === 'view'}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="area1">Doha Central</SelectItem></SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Mobile 1<span className="text-red-500 ml-0.5">*</span></Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.mobile1} onChange={(e) => handleChange('mobile1', e.target.value)} readOnly={viewMode === 'view'} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)} disabled={viewMode === 'view'}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Password<span className="text-red-500 ml-0.5">*</span></Label>
              <Input type="password" className="col-span-2 rounded-none border-gray-300" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} readOnly={viewMode === 'view'} />
            </div>
          </div>
        </div>

        {/* Date Settings Section */}
        <div className="pt-6 border-t border-gray-200">
          <div className="text-sm font-bold text-black tracking-wider mb-4">
            Validity & Dates
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Date Of Birth</Label>
              <Input type="date" className="w-40 rounded-none border-gray-300" value={formData.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} readOnly={viewMode === 'view'} />
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Start Date</Label>
              <Input type="date" className="w-40 rounded-none border-gray-300" value={formData.startDate} onChange={(e) => handleChange('startDate', e.target.value)} readOnly={viewMode === 'view'} />
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Expiry Date</Label>
              <Input type="date" className="w-40 rounded-none border-gray-300" value={formData.expiryDate} onChange={(e) => handleChange('expiryDate', e.target.value)} readOnly={viewMode === 'view'} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          {viewMode !== 'view' && (
            <>
              <Button className="rounded-none bg-main hover:bg-mainhvr text-primary-foreground px-8" onClick={handleSave}>
                <PlusCircle className="w-4 h-4 mr-2" /> {viewMode === 'edit' ? 'Update' : 'Save'}
              </Button>
              <Button variant="outline" className="rounded-none border-gray-300 px-8" onClick={handleReset}>
                <RefreshCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
            </>
          )}
        </div>
      </div>
      </>
      )}

      <p className="text-xs text-red-500 font-mono mt-2">* indicates mandatory</p>
    </div>
  );
};

export default StaffRegistrationPage;