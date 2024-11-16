import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DynamicDateSalesChart from './DynamicDateSalesChart';
import { SalesData } from './FinancialsPage';

type Props = {
  chartData: SalesData;
  fromDate: Date;
  toDate: Date;
};

const ChartTabs = ({ chartData, fromDate, toDate }: Props) => {
  return (
    <Tabs defaultValue="Website">
      <TabsList>
        <TabsTrigger value="Website">Website</TabsTrigger>
        <TabsTrigger value="Salesperson">Salesperson</TabsTrigger>
        <TabsTrigger value="Independant">Independant</TabsTrigger>
      </TabsList>

      <TabsContent value="Website">
        <DynamicDateSalesChart
          title="Website Sales Chart"
          data={chartData.website}
          startDate={fromDate as Date}
          endDate={toDate as Date}
        />
      </TabsContent>
      <TabsContent value="Salesperson">
        <DynamicDateSalesChart
          title="Salesperson Sales Chart"
          data={chartData.salesperson}
          startDate={fromDate as Date}
          endDate={toDate as Date}
        />
      </TabsContent>
      <TabsContent value="Independant">
        <DynamicDateSalesChart
          title="Independant Sales Chart"
          data={chartData.independent}
          startDate={fromDate as Date}
          endDate={toDate as Date}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ChartTabs;
