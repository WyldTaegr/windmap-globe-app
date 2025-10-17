"use client";

import { useEffect, useRef, useState } from "react";
import { Text } from "@react-three/drei";
import AlertPolygon from "./AlertPolygon";

const INITIAL_ALERTS_API_URL = "https://api.weather.gov/alerts?severity=severe";

type AlertFeature = {
  id: string;
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  } | null;
  properties: {
    event: string;
    areaDesc: string;
    severity: string;
    [key: string]: unknown;
  };
};

export default function AlertData({
  globeRadius = 1,
}: {
  globeRadius?: number;
}) {
  const [alerts, setAlerts] = useState<AlertFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;

    async function fetchAlerts() {
      try {
        let nextUrl: string | null = INITIAL_ALERTS_API_URL;

        // keep fetching until there are no more pages
        while (nextUrl && !cancelled) {
          const encodedUrl = encodeURIComponent(nextUrl);
          const res = await fetch(`/api/alerts?url=${encodedUrl}`);
          if (!res.ok) throw new Error("Failed to fetch alerts");

          const data = await res.json();

          const filtered: AlertFeature[] = data.features?.filter(
            (feature: AlertFeature) =>
              feature.geometry &&
              feature.geometry.type === "Polygon" &&
              Array.isArray(feature.geometry.coordinates)
          );

          // Filter out duplicates using the ref-based Set
          const uniqueNew = filtered.filter(f => !seenIds.current.has(f.id));

          // Mark them as seen immediately
          uniqueNew.forEach(f => seenIds.current.add(f.id));

          // Append only new alerts
          if (uniqueNew.length > 0) {
            setAlerts(prev => [...prev, ...uniqueNew]);
            if (loading) setLoading(false);
          }

          nextUrl = data.pagination?.next || null;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching alerts");
      }
    }

    fetchAlerts();

    return () => {
      cancelled = true;
    };
  }, []);

  // Show an initial loading state until the first page is rendered
  if (loading)
    return (
      <group>
        <Text
          position={[0, 0, 1.5]}
          fontSize={0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Loading alerts…
        </Text>
      </group>
    );

  if (error)
    return (
      <group>
        <Text
          position={[0, 0, 1.5]}
          fontSize={0.05}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Error: {error}
        </Text>
      </group>
    );

  return (
    <>
      {alerts.map((alert) => (
        <AlertPolygon
          key={alert.id}
          geometry={alert.geometry!}
          radius={globeRadius * 1.01}
          color={getColorForSeverity(alert.properties.severity)}
        />
      ))}
    </>
  );
}

function getColorForSeverity(severity: string): string {
  switch (severity.toLowerCase()) {
    case "severe":
    case "extreme":
      return "red";
    case "moderate":
      return "orange";
    case "minor":
      return "yellow";
    default:
      return "white";
  }
}
