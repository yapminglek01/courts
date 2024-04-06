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
import { OrderService } from '../../../../services/order.server';
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
                { name: "monthly", data: [31, 40, 28, 51, 42, 65, 75, 49, 60, 75, 39, 150] },
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
                const orders = response.map((e: any) => {
                    // Process each order item here
                    return new Order({
                        id: e._id,
                        status: e.status,
                        billing_address: e.billing_address,
                        total_amount: e.total_amount,
                        quantity: e.quantity,
                        user_id: e.user_id,
                        product_id: e.product_id,
                        session_id: e.session_id
                    });
                });
                console.log(orders); 
            },
            (error) => {
                console.error('Error fetching orders:', error);
            }
        );
    }
    
}
