import Footer from '@components/Footer';
import Header from '@components/Header';
import Sidebar from '@components/SideBar';
import React from 'react';
import { useGetStudents } from '../../hooks/useGetStudents';
import { Container, Content, PageContainer } from './styles';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoading } = useGetStudents();
  return (
    <Container>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Loading....</h1>
        </div>
      ) : (
        <>
          <Header />
          <Content>
            <Sidebar />
            <PageContainer>{children}</PageContainer>
          </Content>
          <Footer />
        </>
      )}
    </Container>
  );
}
