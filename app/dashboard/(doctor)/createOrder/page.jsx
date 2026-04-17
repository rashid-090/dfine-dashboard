'use client';
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Minus, Calendar, User, UploadCloud } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';

const ToothImage = "https://cdn.sanity.io/images/0hjyj1bs/production/979f240e763c7e4c2319e2435de466b4793b230a-360x360.png"

const SelectionRow = ({ label, field, options, formData, handleChange }) => (
  <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm font-medium text-gray-700">{label} :</span>
    <RadioGroup
      value={formData[field]}
      onValueChange={(value) => handleChange(field, value)}
      className="flex gap-4"
    >
      {options.map(opt => (
        <div key={opt.value} className="flex items-center gap-2">
          <RadioGroupItem value={opt.value} id={`${field}-${opt.value}`} />
          <Label htmlFor={`${field}-${opt.value}`} className="text-xs cursor-pointer">{opt.label}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

const CreateOrder = () => {
  const [activeStep, setActiveStep] = useState("order-basics");
  const [formData, setFormData] = useState({
    fileNumber: '',
    orderDate: '2026-04-17',
    expectedDate: '2026-04-17',
    patientName: '',
    priority: false,
    design: 'Crown',
    selectedTeeth: [],
    connectorType: 'Individual',
    ponticDesign: 'modified-ridge-lap',
    // Materials
    materials: [{ material: '', design: '', notation: '', unit: '', shade: '' }],
    // Digital Scans
    digitalScans: '',
    modelPrinted: '',
    modelRequired: '',
    iosSentVia: '',
    // Manual Impression
    upperImpression: '',
    lowerImpression: '',
    biteRequired: '',
    preOpCast: '',
    // Habits
    isGrinder: '',
    isSports: '',
    notes: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.fileNumber || !formData.patientName) {
      toast.error('Please fill in required fields: File Number and Patient Name');
      return;
    }

    // Submit logic here
    console.log('Submitting order:', formData);
    toast.success('Order submitted successfully!');
  };

  const toggleTooth = (id) => {
    setFormData(prev => ({
      ...prev,
      selectedTeeth: prev.selectedTeeth.includes(id)
        ? prev.selectedTeeth.filter(t => t !== id)
        : [...prev.selectedTeeth, id]
    }));
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materials: [...prev.materials, { material: '', design: '', notation: '', unit: '', shade: '' }]
    }));
  };

  const removeMaterial = (index) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index)
    }));
  };

  const updateMaterial = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.map((material, i) =>
        i === index ? { ...material, [field]: value } : material
      )
    }));
  };

  const toothQuadrants = [
    { label: "Upper Right I", ids: [18, 17, 16, 15, 14, 13, 12, 11] },
    { label: "Upper Left II", ids: [21, 22, 23, 24, 25, 26, 27, 28] },
    { label: "Lower Right IV", ids: [48, 47, 46, 45, 44, 43, 42, 41] },
    { label: "Lower Left III", ids: [31, 32, 33, 34, 35, 36, 37, 38] }
  ];

  const steps = ['order-basics', 'general-info', 'uploads'];

  const handleNext = () => {
    const currentIndex = steps.indexOf(activeStep);
    const nextIndex = (currentIndex + 1) % steps.length;
    setActiveStep(steps[nextIndex]);
  };

  const handlePrev = () => {
  const currentIndex = steps.indexOf(activeStep);
  // This logic wraps around to the last step if you click "Prev" on the first step
  const prevIndex = (currentIndex - 1 + steps.length) % steps.length;
  setActiveStep(steps[prevIndex]);
};

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50 min-h-screen">
      <Toaster position="top-right" />
      
      <div className="flex justify-center border-b pb-4 bg-white p-4 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-2 text-main">Create New Order</h1>
      </div>

      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-white border h-14 p-1 shadow-sm">
          <TabsTrigger value="order-basics" className="data-[state=active]:bg-main data-[state=active]:text-white gap-2 h-full">
            <Calendar className="w-4 h-4" /> Order Basics
          </TabsTrigger>
          <TabsTrigger value="general-info" className="data-[state=active]:bg-main data-[state=active]:text-white gap-2 h-full">
            <User className="w-4 h-4" /> General Information
          </TabsTrigger>
          <TabsTrigger value="uploads" className="data-[state=active]:bg-main data-[state=active]:text-white gap-2 h-full">
            <UploadCloud className="w-4 h-4" /> Uploads
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: ORDER BASICS (Original View Content) */}
        <TabsContent value="order-basics" className="space-y-6 pt-4">
          <section className="bg-white border shadow-sm">
            <div className="grid grid-cols-5 bg-main text-white p-2 text-xs font-bold text-center">
              <div>FILE NUMBER</div><div>ORDER DATE</div><div>EXPECTED DATE</div><div>PATIENT NAME</div><div>PRIORITY</div>
            </div>
            <div className="grid grid-cols-5 gap-4 p-4 items-center">
              <Input
                className="rounded-none h-9"
                placeholder="Enter #"
                value={formData.fileNumber}
                onChange={(e) => handleChange('fileNumber', e.target.value)}
              />
              <Input
                type="date"
                value={formData.orderDate}
                onChange={(e) => handleChange('orderDate', e.target.value)}
                className="rounded-none h-9"
              />
              <Input
                type="date"
                value={formData.expectedDate}
                onChange={(e) => handleChange('expectedDate', e.target.value)}
                className="rounded-none h-9"
              />
              <Input
                className="rounded-none h-9"
                placeholder="Full Name"
                value={formData.patientName}
                onChange={(e) => handleChange('patientName', e.target.value)}
              />
              <div className="flex justify-center">
                <Checkbox
                  className="h-5 w-5"
                  checked={formData.priority}
                  onCheckedChange={(checked) => handleChange('priority', checked)}
                />
              </div>
            </div>
          </section>

          <section className="bg-white border shadow-sm overflow-hidden">
            <div className="grid grid-cols-6 bg-main text-white p-2 text-xs font-bold text-center">
              <div>MATERIALS</div><div>DESIGN</div><div>NOTATION</div><div>UNIT</div><div>SHADE</div>
              <div className="flex justify-end pr-2">
                <Plus className="w-5 h-5 bg-green-500 rounded cursor-pointer hover:bg-green-600 transition-colors" onClick={addMaterial} />
              </div>
            </div>
            {formData.materials.map((material, index) => (
              <div key={index} className="grid grid-cols-6 gap-2 p-2 bg-gray-50 items-center">
                <Input
                  className="bg-white rounded-none h-9 border-none"
                  value={material.material}
                  onChange={(e) => updateMaterial(index, 'material', e.target.value)}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none"
                  value={material.design}
                  onChange={(e) => updateMaterial(index, 'design', e.target.value)}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none"
                  value={material.notation}
                  onChange={(e) => updateMaterial(index, 'notation', e.target.value)}
                />
                <Input
                  className="bg-white rounded-none h-9 border-none"
                  value={material.unit}
                  onChange={(e) => updateMaterial(index, 'unit', e.target.value)}
                />
                <Input
                  placeholder="Click to Add Shade"
                  className="bg-white rounded-none h-9 border-none text-xs"
                  value={material.shade}
                  onChange={(e) => updateMaterial(index, 'shade', e.target.value)}
                />
                <div className="flex justify-end pr-2">
                  <Minus
                    className="w-5 h-5 bg-red-500 text-white rounded cursor-pointer"
                    onClick={() => removeMaterial(index)}
                  />
                </div>
              </div>
            ))}
          </section>

          <div className="bg-white p-6 border shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8">
            {toothQuadrants.map((quad) => (
              <div key={quad.label} className="space-y-6">
                <div className="flex justify-center"><span className="bg-main text-white px-4 py-2 text-xs font-medium rounded-sm uppercase">{quad.label}</span></div>
                <div className="flex justify-between px-2">
                  {quad.ids.map(id => (
                    <div key={id} onClick={() => toggleTooth(id)} className="flex flex-col items-center cursor-pointer">
                      <img src={ToothImage} alt={`Tooth ${id}`} className={`w-10 h-14 border  mb-1 object-cover ${formData.selectedTeeth.includes(id) ? 'bg-main' : 'border-gray-300'}`} />
                      <span className="text-[10px] font-bold">{id}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Types Of Trial", options: ['Jig Trial', 'Mock Trial', 'Metal Trial', 'Bisque Trial'] },
              { title: "If InSufficient Room", options: ['Trim Opposing', 'Call to Discuss', 'Metal Occlusal'] },
              { title: "Occlusal Contact", options: ['Light', 'Infra', 'Proper'] },
              { title: "Interproximal Contact", options: ['Point', 'Broad', 'Remove'] }
            ].map((block) => (
              <div key={block.title} className="border bg-white shadow-sm overflow-hidden">
                <div className="p-2 text-center border-b font-bold bg-slate-50 text-[10px] uppercase">{block.title}</div>
                <div className="p-3 space-y-2">
                  {block.options.map(option => (
                    <div key={option} className="flex items-center justify-between"><span className="text-xs">{option}</span><Checkbox className="h-4 w-4" /></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={handleNext} className="bg-main hover:bg-mainhvr px-6 rounded-none h-10 font-bold">
              Next
            </Button>
          </div>
        </TabsContent>

        {/* TAB 2: GENERAL INFORMATION (From Image 1) */}
        <TabsContent value="general-info" className="pt-4 space-y-6">
          <div className="bg-white p-8 border shadow-sm min-h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Digital Scans Box */}
              <div className="border-2 border-black p-6 relative">
                <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 font-bold text-xs">Digital Scans Information</h3>
                <div className="space-y-4 mt-2">
                  <SelectionRow
                    label="Digital Scans"
                    field="digitalScans"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Model to be Printed"
                    field="modelPrinted"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="3D Model Required"
                    field="modelRequired"
                    options={[{label:'Full Arch', value:'full'}, {label:'Half Arch', value:'half'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <div className="flex items-center gap-4 py-2">
                    <span className="text-sm font-medium">Digital IOS Sent Via :</span>
                    <Input
                      className="flex-1 h-8 rounded-none border-gray-300"
                      value={formData.iosSentVia}
                      onChange={(e) => handleChange('iosSentVia', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Manual Impression Box */}
              <div className="border-2 border-black p-6 relative">
                <h3 className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 font-bold text-xs text-nowrap">Manual Impression Information Sending From Clinic</h3>
                <div className="space-y-4 mt-2">
                  <SelectionRow
                    label="Upper"
                    field="upperImpression"
                    options={[{label:'Impression', value:'imp'}, {label:'Cast', value:'cast'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Lower"
                    field="lowerImpression"
                    options={[{label:'Impression', value:'imp'}, {label:'Cast', value:'cast'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Bite"
                    field="biteRequired"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                  <SelectionRow
                    label="Pre Op cast"
                    field="preOpCast"
                    options={[{label:'Yes', value:'yes'}, {label:'No', value:'no'}]}
                    formData={formData}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
         <div className="flex justify-end mt-4 gap-2">
  {/* Previous Button */}
  <Button 
    onClick={handlePrev} 
    className="bg-gray-200 text-black hover:bg-gray-300 px-6 rounded-none h-10 font-bold"
  >
    Previous
  </Button>

  {/* Next Button */}
  <Button 
    onClick={handleNext} 
    className="bg-main hover:bg-mainhvr px-6 rounded-none h-10 font-bold"
  >
    Next
  </Button>
</div>
        </TabsContent>

        {/* TAB 3: UPLOADS (From Image 2) */}
        <TabsContent value="uploads" className="pt-4 space-y-6">
          <div className="bg-white p-10 border shadow-sm space-y-8 text-center">
            <div className="flex justify-center gap-20">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Is Patient Night Grinder :</span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isGrinder === 'yes'}
                    onCheckedChange={(checked) => handleChange('isGrinder', checked ? 'yes' : '')}
                  />
                  <span className="text-xs">Yes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isGrinder === 'no'}
                    onCheckedChange={(checked) => handleChange('isGrinder', checked ? 'no' : '')}
                  />
                  <span className="text-xs">No</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Does Patient Play Contact Sports :</span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isSports === 'yes'}
                    onCheckedChange={(checked) => handleChange('isSports', checked ? 'yes' : '')}
                  />
                  <span className="text-xs">Yes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.isSports === 'no'}
                    onCheckedChange={(checked) => handleChange('isSports', checked ? 'no' : '')}
                  />
                  <span className="text-xs">No</span>
                </div>
              </div>
            </div>

            <div className="text-left space-y-2 max-w-4xl mx-auto">
              <Label className="font-bold text-xs uppercase text-gray-500">Notes :</Label>
              <Textarea
                className="min-h-[100px] border-gray-200"
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
              />
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              <Label className="font-bold text-xs uppercase text-gray-500">Attachments :</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:bg-slate-50 transition-colors cursor-pointer">
                <p className="text-xl font-medium text-gray-600">Drop or Click here to add Attachment</p>
              </div>
              <div className="text-[10px] text-gray-400 space-y-1">
                <p>File Supports : JPEG, PNG, GIF, BMP</p>
                <p>Note : Allows Total File Size less than 10MB,</p>
                <p>Only 6 Files are Allowed to Upload</p>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                className="bg-main hover:bg-mainhvr px-10 rounded-none h-10 font-bold"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <Button
                variant="outline"
                className="px-10 rounded-none h-10 border-gray-300 font-bold"
                onClick={() => toast.success('Print functionality not implemented yet')}
              >
                Print
              </Button>
            </div>
          </div>

               <div className="flex justify-end mt-4 gap-2">
  {/* Previous Button */}
  <Button 
    onClick={handlePrev} 
    className="bg-gray-200 text-black hover:bg-gray-300 px-6 rounded-none h-10 font-bold"
  >
    Previous
  </Button>
</div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreateOrder;