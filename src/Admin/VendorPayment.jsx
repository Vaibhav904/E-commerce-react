import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function VendorPayment() {
 

  return (
    <div className="d-flex">
      <AdminSidebar />

      <div className="dash-header w-100">
        <AdminHeader />

        <div className="container-fluid mt-4">
          <h2 className="dashboard-title mb-4">Vendor Payment</h2>

            <div class="card p-4 shadow-sm">
              <h5 class="mb-3">Withdraw and Payement History</h5>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead class="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Balance</th>
                      <th>Total Earn</th>
                      <th>Status</th>
                      <th>Date</th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>₹5840.00</td>
                          <td>₹2000.00</td>
                          <th>Approve / reject</th>
                          <td>3/17/2026, 10:19:04 AM</td>
                          </tr>
                          </tbody>
                          </table>
                          </div>
                          </div>
           
        </div>
      </div>
    </div>
  );
}
