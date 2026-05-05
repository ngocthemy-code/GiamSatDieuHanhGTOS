import React from 'react';

import {
  LayoutDashboard, Ship, Container, Truck, Settings,
  Bell, User, Monitor, Database, History
} from 'lucide-react';
import { SidebarItem, SidebarParent } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  expandedSections: string[];
  toggleSection: (id: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  expandedSections,
  toggleSection
}) => {
  return (
    <div className="flex h-screen bg-[#f8fafc] font-['Inter',sans-serif] overflow-hidden text-slate-600">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0f172a] text-white flex flex-col shadow-2xl z-20 border-r border-slate-800 overflow-x-hidden">
        <div className="p-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Ship className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-white">GTOS<span className="text-blue-500">PORT</span></h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Hệ thống quản lý</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto overflow-x-hidden no-scrollbar">


          <div className="pb-2">
            <SidebarParent
              icon={Monitor}
              label="Giám sát vận hành"
              expanded={expandedSections.includes('monitoring')}
              onClick={() => toggleSection('monitoring')}
            />
            {expandedSections.includes('monitoring') && (
              <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                <SidebarItem
                  icon={Truck}
                  label="Giám sát cổng"
                  active={activeTab === 'gate'}
                  onClick={() => setActiveTab('gate')}
                  isChild
                />
                <SidebarItem
                  icon={Ship}
                  label="Giám sát cầu tàu"
                  active={activeTab === 'berth'}
                  onClick={() => setActiveTab('berth')}
                  isChild
                />
                <SidebarItem
                  icon={Container}
                  label="Giám sát bãi"
                  active={activeTab === 'yard'}
                  onClick={() => setActiveTab('yard')}
                  isChild
                />
              </div>
            )}
          </div>


          <SidebarParent
            icon={Database}
            label="Thay đổi dữ liệu"
            expanded={expandedSections.includes('data')}
            onClick={() => toggleSection('data')}
          />
          {expandedSections.includes('data') && (
            <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
              <SidebarItem
                icon={Truck}
                label="Dữ liệu cổng"
                active={activeTab === 'gate_edit'}
                onClick={() => setActiveTab('gate_edit')}
                isChild
              />
              <SidebarItem
                icon={Ship}
                label="Dữ liệu cầu tàu"
                active={activeTab === 'berth_edit'}
                onClick={() => setActiveTab('berth_edit')}
                isChild
              />
              <SidebarItem
                icon={Container}
                label="Dữ liệu bãi"
                active={activeTab === 'yard_edit'}
                onClick={() => setActiveTab('yard_edit')}
                isChild
              />
            </div>
          )}

          <div className="pt-2">
            <SidebarItem
              icon={History}
              label="Lịch sử người dùng"
              active={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
            />
          </div>



        </nav>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800/50 m-4 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-blue-500/20">
              AD
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-500 font-medium">Quản trị viên</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </main>
    </div >
  );
};
