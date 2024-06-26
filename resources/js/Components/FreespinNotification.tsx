'use client';

import { Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/Components/ui/card"
export default function FreespinNotification({ freespins }: { freespins?: number }) {
    return (
        <div className="py-2">
        <div className="max-w-7xl mx-auto px-2 sm:px-5">
            <Card className="bg-theme-800/50 bg-gradient-to-bl from-theme-700/50 via-transparent rounded-lg mb-4">
            <CardContent className="space-y-2 py-4 font-semibold text-sm text-theme-50">
                You have <b>{freespins}</b> free spins available on eligible games.
            </CardContent>
            <CardFooter>
            <Link
                href={"/landing?filter=freeSpins&r=" + ((Math.random() * 100000)).toFixed(0)}
            >
            <Button variant="outline">Show Eligible Games</Button>
            </Link>
            </CardFooter>
            </Card>
        </div>
        </div>
    );
}
