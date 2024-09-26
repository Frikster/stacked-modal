"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StackedModal from "@/components/ui/stacked-modal";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ChartDataPoint {
  x: number;
  y: number;
}

const initialChartData: ChartDataPoint[] = [
  { x: 1, y: 186 },
  { x: 2, y: 305 },
  { x: 3, y: 237 },
  { x: 4, y: 73 },
  { x: 5, y: 209 },
  { x: 6, y: 214 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "#2563eb",
  },
} satisfies ChartConfig;

interface ChartDataModalProps {
  chartData: ChartDataPoint[];
  onClose: () => void;
  onAddNumber: () => void;
}

function ChartDataModal({ chartData, onClose, onAddNumber }: ChartDataModalProps) {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">Chart Data</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>X</TableHead>
              <TableHead>Y</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chartData.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.x}</TableCell>
                <TableCell>{data.y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button onClick={onClose} className="mr-4">Close</Button>
          <Button onClick={onAddNumber}>Add Number</Button>
        </div>
    </div>
  );
}

interface AddNumberModalProps {
  newNumber: number;
  onNumberChange: (number: number) => void;
  onClose: () => void;
  onSubmit: () => void;
  onOpenBonusModal: () => void;
}

function AddNumberModal({ newNumber, onNumberChange, onClose, onSubmit, onOpenBonusModal }: AddNumberModalProps) {
  return (
    <div>
        <h2 className="text-xl font-semibold mb-4">Add Number</h2>
        <Input
          type="number"
          value={newNumber}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onNumberChange(Number(e.target.value))}
          className="border p-2 rounded mb-4 w-full"
          placeholder="Enter a number"
        />
        <Button onClick={onClose} className="mr-2">Close</Button>
        <Button onClick={onSubmit} className="mr-2">Submit</Button>
        <Button onClick={onOpenBonusModal}>Open Bonus Modal</Button>
    </div>
  );
}

function BonusModal({ onClose, onOpenBonusModal }: { onClose: () => void, onOpenBonusModal?: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bonus Modal</h2>
      <Button onClick={onClose} className="mr-2">Close</Button>
      { onOpenBonusModal &&
        <Button onClick={onOpenBonusModal} className="ml-2">Open Bonus Modal</Button>
      }
    </div>
  );
}

export default function Home() {
  const [chartData, setChartData] = useState(initialChartData);
  const [newNumber, setNewNumber] = useState<number>(0);

  const handleNumberChange = (num: number) => {
    setNewNumber(num);
  };

  const [modalsOpen, setModalsOpen] = useState(0);
  const handleOpenModal = () => setModalsOpen((prev) => prev + 1);
  const handleCloseModal = () => setModalsOpen((prev) => Math.max(prev - 1, 0));

  const handleSubmitNumber = () => {
    const newBin = { x: chartData.length + 1, y: newNumber };
    setChartData([...chartData, newBin]);
    setNewNumber(0);
    handleCloseModal();
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white text-black p-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <ul>
          <li className="mb-2">Home</li>
          <li className="mb-2">Users</li>
          <li className="mb-2">Organizations</li>
        </ul>
      </div>
      <div className="w-[1px] bg-gray-300"></div>
      <div className="flex-1 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>Chart Data</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[50vh] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <XAxis dataKey="x" />
                <YAxis />
                <Bar dataKey="y" fill="var(--color-value)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <Button onClick={handleOpenModal}>View Numbers</Button>
          </CardFooter>
        </Card>
        
        <StackedModal modalsOpen={modalsOpen} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal}>
          <ChartDataModal
            chartData={chartData}
            onClose={handleCloseModal}
            onAddNumber={handleOpenModal}
          />
          <AddNumberModal
              newNumber={newNumber}
              onNumberChange={handleNumberChange}
              onClose={handleCloseModal}
              onSubmit={handleSubmitNumber}
              onOpenBonusModal={handleOpenModal}
            />
            <BonusModal onClose={handleCloseModal} onOpenBonusModal={handleOpenModal} />
            <BonusModal onClose={handleCloseModal} onOpenBonusModal={handleOpenModal} />
            <BonusModal onClose={handleCloseModal} onOpenBonusModal={handleOpenModal} />
            <BonusModal onClose={handleCloseModal} />
        </StackedModal>
      </div>
    </div>
  );
}
