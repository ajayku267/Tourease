'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function NotificationsSettingsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notification Settings</h1>
        <p className="text-muted-foreground mt-2">Manage how and when you receive notifications.</p>
      </div>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Email Notifications</CardTitle>
            <CardDescription>Control which emails you receive from TourEase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="account-emails" defaultChecked />
                <Label htmlFor="account-emails">Account updates and security alerts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="trip-emails" defaultChecked />
                <Label htmlFor="trip-emails">Trip reminders and updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="booking-emails" defaultChecked />
                <Label htmlFor="booking-emails">Booking confirmations and updates</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing-emails" />
                <Label htmlFor="marketing-emails">Marketing and promotional emails</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter">Weekly newsletter</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Email Preferences</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Push Notifications</CardTitle>
            <CardDescription>Control which notifications appear on your device.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Push Notifications</p>
                <p className="text-sm text-muted-foreground">Allow notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="trip-push" defaultChecked />
                <Label htmlFor="trip-push">Trip updates and reminders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="booking-push" defaultChecked />
                <Label htmlFor="booking-push">Booking notifications</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="message-push" defaultChecked />
                <Label htmlFor="message-push">Messages from guides and travelers</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="promo-push" />
                <Label htmlFor="promo-push">Promotions and deals</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Push Notification Settings</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notification Frequency</CardTitle>
            <CardDescription>Choose how often you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trip-frequency">Trip Reminders</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="trip-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly summary</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message-frequency">Message Notifications</Label>
                  <Select defaultValue="realtime">
                    <SelectTrigger id="message-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly summary</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Frequency Settings</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 