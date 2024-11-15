import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import IndependantSalesChart, { IndependantSalesData } from './IndependantSalesChart';
import SalespersonSalesChart, { SalespersonSalesData } from './SalespersonSalesChart';
import WebsiteSalesChart, { WebsiteSalesData } from './WebsiteSalesChart';

type Props = {
  totalSalepersonRevenue: SalespersonSalesData[];
  totalWebsiteRevenue: WebsiteSalesData[];
  totalIndependantSalesRevenue: IndependantSalesData[];
  fromDate: Date;
  toDate: Date;
};

const ChartTabs = ({
  totalIndependantSalesRevenue,
  totalSalepersonRevenue,
  totalWebsiteRevenue,
  fromDate,
  toDate,
}: Props) => {
  return (
    <Tabs defaultValue="Website">
      <TabsList>
        <TabsTrigger value="Website">Website</TabsTrigger>
        <TabsTrigger value="Salesperson">Salesperson</TabsTrigger>
        <TabsTrigger value="Independant">Independant</TabsTrigger>
      </TabsList>

      <TabsContent value="Website">
        <WebsiteSalesChart
          websiteSalesData={totalWebsiteRevenue}
          startDate={fromDate as Date}
          endDate={toDate as Date}
        />
      </TabsContent>
      <TabsContent value="Salesperson">
        <SalespersonSalesChart
          startDate={fromDate as Date}
          endDate={toDate as Date}
          SalespersonSalesData={totalSalepersonRevenue}
        />
      </TabsContent>
      <TabsContent value="Independant">
        <IndependantSalesChart
          startDate={fromDate as Date}
          endDate={toDate as Date}
          IndependantSalesData={totalIndependantSalesRevenue}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChartTabs;
