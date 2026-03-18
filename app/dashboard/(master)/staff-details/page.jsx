'use client';
import React, { useState } from 'react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, RefreshCcw, PlusCircle, Mail } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const StaffRegistrationPage = () => {
  const [searchStaff, setSearchStaff] = useState('');
  
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
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto space-y-6 bg-background min-h-screen font-sans">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 border-b pb-2">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Staff Registration</h1>
        <div className="text-xs text-red-500 font-mono">* indicates mandatory</div>
      </div>

      {/* Staff Search Section */}
      <div className="border border-gray-200 p-6 space-y-4 shadow-sm mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label className="text-sm font-medium block mb-1">Enter Staff Name:</Label>
            <div className="flex gap-2 w-full max-w-md">
              <Input placeholder="Search..." className="rounded-none border-border bg-background h-9 text-xs" />
              <Button className="bg-main hover:bg-mainhvr cursor-pointer text-primary-foreground rounded-none px-6 h-9 text-xs font-bold uppercase">Select</Button>
              <Button variant="outline" className="rounded-none h-9 border-gray-300"><RefreshCcw className="w-4 h-4 text-gray-600" /></Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="border border-gray-200 p-6 space-y-6 shadow-sm mb-10">
        <div className="text-sm font-bold text-black tracking-wider">
          Staff Details
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
              <Select value={formData.department} onValueChange={(v) => handleChange('department', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">IT Department</SelectItem>
                  <SelectItem value="hr">HR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Qualification</Label>
              <Select value={formData.qualification} onValueChange={(v) => handleChange('qualification', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="mbbs">MBBS</SelectItem></SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Address Line 2</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.addressLine2} onChange={(e) => handleChange('addressLine2', e.target.value)} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Email</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">City</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Status</Label>
              <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Username<span className="text-red-500 ml-0.5">*</span></Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.username} onChange={(e) => handleChange('username', e.target.value)} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 items-start gap-2">
              <Label className="text-sm font-medium">Staff Name<span className="text-red-500 ml-0.5">*</span></Label>
              <div className="col-span-2 space-y-2">
                <Select value={formData.salutation} onValueChange={(v) => handleChange('salutation', v)}>
                  <SelectTrigger className="rounded-none border-gray-300"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr.">Dr.</SelectItem>
                    <SelectItem value="Mr.">Mr.</SelectItem>
                  </SelectContent>
                </Select>
                <Input placeholder="Enter Staff Name" className="rounded-none border-gray-300" value={formData.staffName} onChange={(e) => handleChange('staffName', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Address Line 1</Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.addressLine1} onChange={(e) => handleChange('addressLine1', e.target.value)} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Country</Label>
              <Select value={formData.country} onValueChange={(v) => handleChange('country', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="qatar">Qatar</SelectItem></SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Area</Label>
              <Select value={formData.area} onValueChange={(v) => handleChange('area', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent><SelectItem value="area1">Doha Central</SelectItem></SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Mobile 1<span className="text-red-500 ml-0.5">*</span></Label>
              <Input className="col-span-2 rounded-none border-gray-300" value={formData.mobile1} onChange={(e) => handleChange('mobile1', e.target.value)} />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Gender</Label>
              <Select value={formData.gender} onValueChange={(v) => handleChange('gender', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300"><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Password<span className="text-red-500 ml-0.5">*</span></Label>
              <Input type="password" className="col-span-2 rounded-none border-gray-300" value={formData.password} onChange={(e) => handleChange('password', e.target.value)} />
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
              <Input type="date" className="w-40 rounded-none border-gray-300" value={formData.dateOfBirth} onChange={(e) => handleChange('dateOfBirth', e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Start Date</Label>
              <Input type="date" className="w-40 rounded-none border-gray-300" value={formData.startDate} onChange={(e) => handleChange('startDate', e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Expiry Date</Label>
              <Input type="date" className="w-40 rounded-none border-gray-300" value={formData.expiryDate} onChange={(e) => handleChange('expiryDate', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          <Button className="rounded-none bg-main hover:bg-mainhvr text-primary-foreground px-8" onClick={handleSave}>
            <PlusCircle className="w-4 h-4 mr-2" /> Save
          </Button>
          <Button variant="outline" className="rounded-none border-gray-300 px-8" onClick={handleReset}>
            <RefreshCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">* Required fields</p>
    </div>
  );
};

export default StaffRegistrationPage;