import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexYAxis,
    ApexLegend,
    ApexXAxis,
    ApexTooltip,
    ApexTheme,
    ApexGrid,
    ApexPlotOptions
} from 'ng-apexcharts';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/order.model';

export type salesChartOptions = {
    series: ApexAxisChartSeries | any;
    chart: ApexChart | any;
    xaxis: ApexXAxis | any;
    yaxis: ApexYAxis | any;
    stroke: any;
    theme: ApexTheme | any;
    tooltip: ApexTooltip | any;
    dataLabels: ApexDataLabels | any;
    legend: ApexLegend | any;
    colors: string[] | any;
    markers: any;
    grid: ApexGrid | any;
    plotOptions: ApexPlotOptions | any;
};

@Component({
    selector: 'app-sales-ratio',
    templateUrl: './sales-ratio.component.html',
    styleUrls: ['./sales-ratio.component.css']
})
export class SalesRatioComponent implements OnInit {
    @ViewChild("chart") chart: ChartComponent = Object.create(null);
    public salesChartOptions: Partial<salesChartOptions>;
    public salesChartOptions1: Partial<salesChartOptions>;
    private chartInstance: any;
    currentView: string = 'yearly';
    orders: Order[] = [];
    totalAmount: number = 0;
    totalAmountThisMonth: number = 0;
    monthlySalesData: number[] = [];

    constructor(private router: Router, private orderService: OrderService) {
      this.salesChartOptions = {
            series: [
                { name: "yearly", data: [31, 40, 28, 51, 42] },
            ],
            chart: {
                fontFamily: 'Montserrat,sans-serif',
                height: 290,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#0d6efd", "#009efb", "#6771dc"],
            stroke: {
                show: true,
                width: 4,
                colors: ["transparent"],
            },
            grid: {
                strokeDashArray: 3,
            },
            xaxis: {
                categories: ["2020", "2021", "2022", "2023", "2024"],
            },
            tooltip: {
                theme: 'dark'
            }
        };

        this.salesChartOptions1 = {
            series: [
                { name: "monthly", data: [] }, // Initialize with empty data
            ],
            chart: {
                fontFamily: 'Montserrat,sans-serif',
                height: 290,
                type: 'area',
                toolbar: {
                    show: false
                },
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#7D27E4", "#5F497B", "#312341"],
            stroke: {
                show: true,
                width: 4,
                colors: ["transparent"],
            },
            grid: {
                strokeDashArray: 3,
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            },
            tooltip: {
                theme: 'dark'
            }
        };
    }

    ngOnInit(): void {
        this.getOrders();
    }

    getOrders(): void {
        this.orderService.getOrders().subscribe(
            (response) => {
                this.orders = response.data;
                console.log('Orders:', this.orders);
                // Calculate total amount for the year
                this.totalAmount = this.orders.reduce((total, order) => total + (+order.total_amount), 0);
                console.log('Total Amount This Year:', this.totalAmount);

                // Calculate total amount for the current month
                const currentMonth = new Date().getMonth();
                this.totalAmountThisMonth = this.orders
                    .filter(order => new Date(order.created_date).getMonth() === currentMonth)
                    .reduce((total, order) => total + (+order.total_amount), 0);
                console.log('Total Amount This Month:', this.totalAmountThisMonth);

                // Calculate monthly sales data
                this.calculateMonthlySalesData();
            },
            (error) => {
                console.error('Error fetching orders:', error);
            }
        );
    }

    calculateMonthlySalesData(): void {
        const monthlyData: number[] = Array(12).fill(0); // Initialize array with zeros for each month
        this.orders.forEach(order => {
            const month = new Date(order.created_date).getMonth();
            monthlyData[month] += +order.total_amount; // Accumulate sales amount for each month
        });
        this.monthlySalesData = monthlyData;
        console.log('Monthly Sales Data:', this.monthlySalesData);
        // Update the series data for monthly sales chart
        this.salesChartOptions1.series = [{ name: "monthly", data: this.monthlySalesData }];
    }
}
