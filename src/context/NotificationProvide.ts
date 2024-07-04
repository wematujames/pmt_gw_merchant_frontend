// import React, { useContext, ReactNode } from 'react';
// import { notification } from 'antd';
// import NotificationContext from './NotificationContext';

// type NotificationType = 'success' | 'info' | 'warning' | 'error';

// export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

//   const notify = (type: NotificationType, message: string, description?: string) => {
//     notification[type]({
//       message,
//       description,
//     });
//   };

//   return (
//     <NotificationContext.Provider value={{ notify }}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => {
//   const context = useContext(NotificationContext);

//   if (!context) {
//     throw new Error('useNotification must be used within a NotificationProvider');
//   }

//   return context;
// };
