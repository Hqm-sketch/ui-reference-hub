"use client";

import * as React from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type Device = "desktop" | "mobile" | "tablet";

const deviceConfig: Record<Device, { width: string; label: string; icon: React.ComponentType<{ className?: string }> }> = {
  desktop: { width: "100%", label: "桌面端", icon: Monitor },
  mobile: { width: "375px", label: "移动端", icon: Smartphone },
  tablet: { width: "768px", label: "平板", icon: Tablet },
};

interface DevicePreviewProps {
  children?: React.ReactNode;
  defaultDevice?: Device;
  onDeviceChange?: (device: Device) => void;
  className?: string;
}

export function DevicePreview({ children, defaultDevice = "desktop", onDeviceChange, className }: DevicePreviewProps) {
  const [device, setDevice] = React.useState<Device>(defaultDevice);

  const handleChange = (value: string) => {
    const d = value as Device;
    setDevice(d);
    onDeviceChange?.(d);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Tabs value={device} onValueChange={handleChange}>
        <div className="flex items-center justify-between">
          <TabsList>
            {Object.entries(deviceConfig).map(([key, config]) => {
              const Icon = config.icon;
              return (
                <TabsTrigger key={key} value={key} className="gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{config.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
          {device !== "desktop" && (
            <span className="text-xs text-zinc-400 tabular-nums">{deviceConfig[device].width}</span>
          )}
        </div>
      </Tabs>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <div
          className="mx-auto transition-all duration-300"
          style={{ maxWidth: deviceConfig[device].width }}
        >
          <div className="h-[500px] overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
