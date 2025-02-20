'use client'
import { useState } from 'react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { useSystemListViewModel } from './useSystemListViewModel';
import SearchModal from './components/SearchModal';
import DetailViewModal from '../components/DetailViewModal';
import { colors, transitions } from '../styles/theme';
import AddSystemButton from '../components/button/addsystem';
import SearchButton from '../components/button/search';
import FormBox from '../components/form/form_box';
import  { CheckboxItem } from '@/components/checkbox3d';
import Button_v2 from '@/components/button/delete._v2';
import { SystemData } from '../types/inputform';
import DetailButton from '../components/button/detail'; // เพิ่ม import DetailButton
import {useSession} from 'next-auth/react';

export default function SystemList() {
  const { data: _session, status } = useSession(); 
  const {
    systems,
    // fetchSystems, // Make sure this is exposed from the view model
    loading,
    selectedItems,
    // showAlert,
    // alertType,
    handleSelectItem,
    handleBulkDelete,
    handleDownloadCSV,
    // setShowAlert,
    // setAlertType,
    // handleBulkView,
    handleDelete,
    currentSystems,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
    showSearchModal,
    setShowSearchModal,
    handleSearch,
    clearSearch,
    isFiltering,
    lastSearchCriteria,
  } = useSystemListViewModel();

  const [selectedSystems, setSelectedSystems] = useState<SystemData[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
    
    console.log('useSession', useSession);
    console.log('status',status)  
  // Add helper function to get selected systems
  const getSelectedSystems = (): SystemData[] => {
    return systems.filter(system => selectedItems.includes(system.id));
  };

  // Update the bulk view button click handler
  const handleBulkViewClick = () => {
    const systemsToView = getSelectedSystems();
    setSelectedSystems(systemsToView);
    setShowDetailModal(true);
  };

  // Add handler for single system view
  const handleSingleSystemView = (system: SystemData) => {
    setSelectedSystems([system]); // Put single system in array
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: colors.background.primary }}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: colors.button.primary.background }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: colors.background.primary }}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/inputform">
            <AddSystemButton />
          </Link>
          <h1 className="text-2xl font-bold" style={{ color: colors.text.primary }}>ระบบทั้งหมด</h1>
          <div className="flex space-x-3 items-center"> {/* เพิ่ม items-center */}
            {selectedItems.length === 0 ? (
              <>
                <div onClick={() => setShowSearchModal(true)}>
                  <SearchButton />
                </div>
                {isFiltering && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearSearch}
                    style={{
                      backgroundColor: colors.input.background,
                      color: colors.text.primary,
                      transition: transitions.default
                    }}
                    className="px-4 py-2 rounded-lg hover:bg-opacity-80"
                  >
                    ล้างการค้นหา
                  </motion.button>
                )}
              </>
            ) : (
              <>
              <span>เลือก{selectedItems.length}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBulkDelete}
                  style={{
                    backgroundColor: colors.button.danger.background,
                    transition: transitions.default,
                    height: '45px', // กำหนดความสูงให้เท่ากับปุ่มอื่น
                  }}
                  className="px-4 text-white rounded-lg hover:bg-opacity-80 flex items-center"
                >
                  ลบที่เลือก 
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadCSV}
                  style={{
                    height: '45px', // กำหนดความสูงให้เท่ากับปุ่มอื่น
                  }}
                  className="px-4 bg-green-500 text-white rounded-lg flex items-center"
                >
                  ดาวน์โหลด CSV 
                </motion.button>
                <DetailButton 
                  onClick={handleBulkViewClick} 
                  isBulk={true} 
                  count={selectedItems.length}
                  
                />
              </>
            )}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentSystems.map((system) => {
            const envInfo = (system as { environmentInfo?: { serverName: string; environment: string; ip: string }[] }).environmentInfo || [];
            
            const initialContent = envInfo.length > 0 && (
              <div className="space-y-2 mb-4">
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  <span className="font-medium">Servername:</span> {envInfo[0].serverName}
                </p>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  <span className="font-medium">Environment:</span> {envInfo[0].environment}
                </p>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  <span className="font-medium">IP server:</span> {envInfo[0].ip}
                </p>
              </div>
            );

            const expandableContent = envInfo.slice(1).map((env, index) => (
              <div key={index} className="space-y-2 mb-4">
                <p key={index} className="text-sm" style={{ color: colors.text.secondary }}>
                  <span className="font-medium">Servername:</span> {env.serverName}
                </p>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  <span className="font-medium">Environment:</span> {env.environment}
                </p>
                <p className="text-sm" style={{ color: colors.text.secondary }}>
                  <span className="font-medium">IP server:</span> {env.ip}
                </p>
              </div>
            ));

            return (
              <motion.div
                key={system.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <FormBox
                  header={`${system.systemName}`}
                  rightHeaderContent={
                    <div className="flex items-center space-x-2">
                     
                        <CheckboxItem
                          checked={selectedItems.includes(system.id)}
                          onChangeAction={() => handleSelectItem(system.id)}
                        />
                     
                      <Button_v2 onClick={() => handleDelete(system.id)} />
                    </div>
                  }
                  hasExpandableContent={envInfo.length > 1}
                  initialContent={initialContent}
                  expandableContent={expandableContent}
                  totalItems={envInfo.length}
                  editLink={`/edit_publish/${system.id}`}
                  onDetailClick={() => handleSingleSystemView(system)}
                >
                  {/* ส่ง children เป็น empty div หรือ null ถ้าไม่มีเนื้อหา */}
                  <div></div>
                </FormBox>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            style={{
              backgroundColor: currentPage === 1 ? colors.input.background : colors.button.primary.background,
              color: colors.text.primary,
              transition: transitions.default
            }}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-opacity-80'
            }`}
          >
            ย้อนกลับ
          </button>
          <span className="text-gray-700">
            หน้า {currentPage} จาก {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: currentPage === totalPages ? colors.input.background : colors.button.primary.background,
              color: colors.text.primary,
              transition: transitions.default
            }}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? 'cursor-not-allowed'
                : 'hover:bg-opacity-80'
            }`}
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* Keep modals and alerts outside the container but inside the wrapper */}
      {/* SearchModal */}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSearch={handleSearch}
        initialCriteria={lastSearchCriteria}
      />



      {/* DetailViewModal */}
      {showDetailModal && (
        <DetailViewModal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          systems={selectedSystems}
        />
      )}
    </div>
  );
}