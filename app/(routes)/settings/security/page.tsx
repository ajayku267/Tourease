'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Shield, Smartphone } from 'lucide-react'

export default function SecuritySettingsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Security Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account security and authentication options.</p>
      </div>
      
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Update your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Update Password</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>Add an extra layer of security to your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Enable Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require a verification code when logging in.</p>
              </div>
              <Switch />
            </div>
            
            <Alert className="mt-4">
              <Smartphone className="h-4 w-4" />
              <AlertTitle>Not enabled</AlertTitle>
              <AlertDescription>
                Two-factor authentication adds an extra layer of security to your account by requiring a verification code in addition to your password.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button>Set Up Two-Factor Authentication</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Login Sessions</CardTitle>
            <CardDescription>Manage your active login sessions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-muted-foreground">Windows - Chrome • IP: 192.168.1.1</p>
                  </div>
                  <p className="text-sm text-green-600 font-medium">Active Now</p>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">iOS - Safari</p>
                    <p className="text-sm text-muted-foreground">IP: 192.168.1.2 • Last active 2 days ago</p>
                  </div>
                  <Button variant="outline" size="sm">Revoke</Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Sign Out All Sessions</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Security Notifications</CardTitle>
            <CardDescription>Get notified about security events on your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Alerts</p>
                <p className="text-sm text-muted-foreground">Receive email notifications for suspicious activity.</p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive push notifications for suspicious activity.</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save Notification Preferences</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 