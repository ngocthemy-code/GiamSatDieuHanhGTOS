import React, { useState } from 'react';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { GateMonitoring } from './features/gate/GateMonitoring';
import { GateEdit } from './features/gate/GateEdit';
import { BerthMonitoring } from './features/berth/BerthMonitoring';
import { BerthEdit } from './features/berth/BerthEdit';
import { YardMonitoring } from './features/yard/YardMonitoring';
import { YardEdit } from './features/yard/YardEdit';
import { HistoryView } from './features/history/HistoryView';
import { 
  mockGateData, 
  berthGroups, 
  yardGroups, 
  tacNghiepOptions, 
  cargoTypeOptions, 
  directionOptions 
} from './shared/constants/mockData';

export default function App() {
  // Global State
  const [activeTab, setActiveTab] = useState('gate');
  const [expandedSections, setExpandedSections] = useState<string[]>(['monitoring', 'data']);
  
  // Filter States
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterVesselGlobal, setFilterVesselGlobal] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Feature Specific States
  const [activeTacNghiep, setActiveTacNghiep] = useState('ALL');
  const [searchSoLenh, setSearchSoLenh] = useState('');
  const [searchVehicle, setSearchVehicle] = useState('');
  const [vesselSearchTerm, setVesselSearchTerm] = useState('');
  const [cargoTypeFilter, setCargoTypeFilter] = useState('ALL');
  const [directionFilter, setDirectionFilter] = useState('ALL');
  const [yardVesselFilter, setYardVesselFilter] = useState('');
  const [yardPhuongAnFilter, setYardPhuongAnFilter] = useState('ALL');
  const [yardCargoFilter, setYardCargoFilter] = useState('ALL');
  const [yardViTriFilter, setYardViTriFilter] = useState('ALL');
  
  // UI States
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [editingGateId, setEditingGateId] = useState<string | null>(null);
  const [editingBerthId, setEditingBerthId] = useState<string | null>(null);
  const [editingYardId, setEditingYardId] = useState<string | null>(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // Handlers
  const handleRefresh = () => {
    setIsFilterApplied(true);
  };
  const toggleSection = (id: string) => {
    setExpandedSections(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleRow = (id: string) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const allVessels = Array.from(new Set([
    ...berthGroups.map(g => g.tau),
    ...yardGroups.flatMap(g => g.items.map(i => i.tau)),
    ...mockGateData.map(d => d.tau),
  ])).sort();

  const filteredGateData = mockGateData.filter(item => {
    const matchesGlobal =
      searchTerm === '' ||
      item.soLenh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.soXe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tenHang.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSoLenh =
      searchSoLenh === '' ||
      item.soLenh.toLowerCase().includes(searchSoLenh.toLowerCase());

    const matchesVehicle =
      searchVehicle === '' ||
      item.soXe.toLowerCase().includes(searchVehicle.toLowerCase()) ||
      item.soRomooc.toLowerCase().includes(searchVehicle.toLowerCase());

    const matchesFilter = activeTacNghiep === 'ALL' || item.tacNghiep === activeTacNghiep;

    return matchesGlobal && matchesSoLenh && matchesVehicle && matchesFilter;
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'gate':
        return (
          <GateMonitoring
            filteredData={filteredGateData}
            mockData={mockGateData}
            filterDateFrom={filterDateFrom}
            setFilterDateFrom={setFilterDateFrom}
            filterDateTo={filterDateTo}
            setFilterDateTo={setFilterDateTo}
            filterVesselGlobal={filterVesselGlobal}
            setFilterVesselGlobal={setFilterVesselGlobal}
            activeTacNghiep={activeTacNghiep}
            setActiveTacNghiep={setActiveTacNghiep}
            searchSoLenh={searchSoLenh}
            setSearchSoLenh={setSearchSoLenh}
            searchVehicle={searchVehicle}
            setSearchVehicle={setSearchVehicle}
            allVessels={allVessels}
            tacNghiepOptions={tacNghiepOptions}
            isFilterApplied={isFilterApplied}
            onRefresh={handleRefresh}
          />
        );
      case 'gate_edit':
        return (
          <GateEdit
            mockData={mockGateData}
            filterDateFrom={filterDateFrom}
            setFilterDateFrom={setFilterDateFrom}
            filterDateTo={filterDateTo}
            setFilterDateTo={setFilterDateTo}
            isFilterApplied={isFilterApplied}
            editingGateId={editingGateId}
            setEditingGateId={setEditingGateId}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            onRefresh={handleRefresh}
          />
        );
      case 'berth':
        return (
          <BerthMonitoring
            berthGroups={berthGroups}
            filterDateFrom={filterDateFrom}
            setFilterDateFrom={setFilterDateFrom}
            filterDateTo={filterDateTo}
            setFilterDateTo={setFilterDateTo}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            vesselSearchTerm={vesselSearchTerm}
            setVesselSearchTerm={setVesselSearchTerm}
            cargoTypeFilter={cargoTypeFilter}
            setCargoTypeFilter={setCargoTypeFilter}
            directionFilter={directionFilter}
            setDirectionFilter={setDirectionFilter}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            cargoTypeOptions={cargoTypeOptions}
            directionOptions={directionOptions}
            isFilterApplied={isFilterApplied}
            onRefresh={handleRefresh}
          />
        );
      case 'berth_edit':
        return (
          <BerthEdit
            berthGroups={berthGroups}
            filterDateFrom={filterDateFrom}
            setFilterDateFrom={setFilterDateFrom}
            filterDateTo={filterDateTo}
            setFilterDateTo={setFilterDateTo}
            isFilterApplied={isFilterApplied}
            editingBerthId={editingBerthId}
            setEditingBerthId={setEditingBerthId}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            onRefresh={handleRefresh}
          />
        );
      case 'yard':
        return (
          <YardMonitoring
            yardGroups={yardGroups}
            filterDateFrom={filterDateFrom}
            setFilterDateFrom={setFilterDateFrom}
            filterDateTo={filterDateTo}
            setFilterDateTo={setFilterDateTo}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            yardVesselFilter={yardVesselFilter}
            setYardVesselFilter={setYardVesselFilter}
            yardPhuongAnFilter={yardPhuongAnFilter}
            setYardPhuongAnFilter={setYardPhuongAnFilter}
            yardCargoFilter={yardCargoFilter}
            setYardCargoFilter={setYardCargoFilter}
            yardViTriFilter={yardViTriFilter}
            setYardViTriFilter={setYardViTriFilter}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            allVessels={allVessels}
            cargoTypeOptions={cargoTypeOptions}
            isFilterApplied={isFilterApplied}
            onRefresh={handleRefresh}
          />
        );
      case 'yard_edit':
        return (
          <YardEdit
            yardGroups={yardGroups}
            filterDateFrom={filterDateFrom}
            setFilterDateFrom={setFilterDateFrom}
            filterDateTo={filterDateTo}
            setFilterDateTo={setFilterDateTo}
            isFilterApplied={isFilterApplied}
            editingYardId={editingYardId}
            setEditingYardId={setEditingYardId}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            onRefresh={handleRefresh}
          />
        );
      case 'history':
        return <HistoryView title="Lịch sử người dùng" isFilterApplied={isFilterApplied} onRefresh={handleRefresh} />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <h2 className="text-xl font-bold text-slate-400">Tính năng đang phát triển</h2>
          </div>
        );
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      expandedSections={expandedSections}
      toggleSection={toggleSection}
    >
      {renderContent()}
    </DashboardLayout>
  );
}
