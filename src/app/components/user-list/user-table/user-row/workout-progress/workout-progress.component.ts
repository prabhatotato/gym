import { Component, Input, OnInit } from '@angular/core';
import { Workout } from '../../../../../services/user.service';

@Component({
  selector: 'app-workout-progress',
  templateUrl: './workout-progress.component.html',
  styleUrls: ['./workout-progress.component.css']
})
export class WorkoutProgressComponent implements OnInit {
  @Input() workouts: Workout[] = [];
  chartOptions: any;

  ngOnInit(): void {
    this.updateChartData();
  }

  updateChartData(): void {
    const workoutTypes = [...new Set(this.workouts.map(workout => workout.type))];
    const dataPoints = workoutTypes.map(type => {
      const totalMinutes = this.workouts
        .filter(workout => workout.type === type)
        .reduce((sum, workout) => sum + workout.minutes, 0);
      return { label: type, y: totalMinutes };
    });

    this.chartOptions = {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Workout Progress"
      },
      axisX: {
        title: "Workout Types"
      },
      axisY: {
        title: "Minutes",
        includeZero: true
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    };
  }
}
