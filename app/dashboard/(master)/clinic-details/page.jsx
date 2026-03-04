'use client';
import React, { useState } from 'react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, RefreshCcw, PlusCircle } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const ClinicDetailsPage = () => {
  const [searchDoctor, setSearchDoctor] = useState('');
  
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
    toast.success("Clinic Saved Successfully");
  };

  return (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto space-y-6 bg-background min-h-screen font-sans">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-y-4 border-b pb-2">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-foreground">Clinic Details</h1>
        <div className="text-xs text-red-500 font-mono">* indicates mandatory</div>
      </div>

      {/* Doctor Search Section */}
      <div className="border border-border p-6 space-y-4 shadow-sm mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <Label className="text-sm font-medium block mb-1">Enter Doctor Name:</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input 
                  placeholder="Search Doctor Name"
                  className="rounded-none border-border pr-10"
                  value={searchDoctor}
                  onChange={(e) => setSearchDoctor(e.target.value)}
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
              <Button variant="outline" className="rounded-none border-gray-300">
                Search
              </Button>
            </div>
          </div>
        </div>
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
              />
            </div>

            <div className="grid grid-cols-3 items-start gap-2">
              <Label className="text-sm font-medium">Clinic Name</Label>
              <div className="col-span-2 space-y-2">
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
              </div>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Collection Centre</Label>
              <Select value={formData.collectionCentre} onValueChange={(v) => handleChange('collectionCentre', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centre1">Main Centre</SelectItem>
                  <SelectItem value="centre2">Branch Centre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">House/Apartment Name</Label>
              <Select value={formData.houseApartment} onValueChange={(v) => handleChange('houseApartment', v)}>
                <SelectTrigger className="col-span-2 rounded-none border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bldg1">Building 1</SelectItem>
                  <SelectItem value="bldg2">Building 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Street</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.street}
                onChange={(e) => handleChange('street', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">City<span className="text-red-500 ml-0.5">*</span></Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Land Mark</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.landmark}
                onChange={(e) => handleChange('landmark', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Office Landline</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.officeLandline}
                onChange={(e) => handleChange('officeLandline', e.target.value)}
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
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Mobile 2</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.mobile2}
                onChange={(e) => handleChange('mobile2', e.target.value)}
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
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">TIN No</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.tinNo}
                onChange={(e) => handleChange('tinNo', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">CST No</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.cstNo}
                onChange={(e) => handleChange('cstNo', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-3 items-center gap-2">
              <Label className="text-sm font-medium">Username</Label>
              <Input 
                className="col-span-2 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
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
              />
            </div>
            <div>
              <Label className="text-sm font-medium block mb-1">Contact No</Label>
              <Input 
                className="rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.contactNo}
                onChange={(e) => handleChange('contactNo', e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm font-medium block mb-1">User Name</Label>
              <Input 
                className="rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.docUsername}
                onChange={(e) => handleChange('docUsername', e.target.value)}
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
              />
            </div>
            <div>
              <Label className="text-sm font-medium block mb-1">Options</Label>
              <Select value={formData.docOptions} onValueChange={(v) => handleChange('docOptions', v)}>
                <SelectTrigger className="rounded-none border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                </SelectContent>
              </Select>
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
              <div className="flex items-center gap-3">
                <span className="text-sm">{formData.clinicStatus}</span>
                <div 
                  className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${formData.clinicStatus === 'Active' ? 'bg-green-600' : 'bg-gray-300'}`}
                  onClick={() => handleChange('clinicStatus', formData.clinicStatus === 'Active' ? 'Inactive' : 'Active')}
                >
                  <div className={`bg-white w-3 h-3 rounded-full shadow-sm transition-transform ${formData.clinicStatus === 'Active' ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Clinic Type</Label>
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
            </div>

            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Opening Balance (QAR)</Label>
              <Input 
                className="w-32 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.openingBalance}
                onChange={(e) => handleChange('openingBalance', e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Invoice Type</Label>
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
            </div>

            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Credit limit (QAR)</Label>
              <Input 
                className="w-32 rounded-none border-gray-300"
                placeholder="Input Box"
                value={formData.creditLimit}
                onChange={(e) => handleChange('creditLimit', e.target.value)}
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
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t">
          <Button className="rounded-none bg-primary hover:bg-primary/80 text-primary-foreground px-8" onClick={handleSave}>
            <PlusCircle className="w-4 h-4 mr-2" /> Save
          </Button>
          <Button variant="outline" className="rounded-none border-border px-8" onClick={handleReset}>
            <RefreshCcw className="w-4 h-4 mr-2" /> Reset
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-2">* Required fields</p>
    </div>
  );
};

export default ClinicDetailsPage;