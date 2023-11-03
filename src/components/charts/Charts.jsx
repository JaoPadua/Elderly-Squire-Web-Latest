import { Grid, Container, Typography } from '@mui/material';
import {AppCurrentVisits,AppWebsiteVisits,AppWidgetSummary,} from '../app';





export default function DashboardCharts(){
    return(
        <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back Admin
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Current Senior Citizens" total={714000} icon={'material-symbols:elderly'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Registered Senior Citizens" total={1352831} color="info" icon={'healthicons:elderly'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Deceased Elders" total={14580} color="warning" icon={'mdi:tombstone'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Id Registration" total={1000} color="error" icon={'ic:baseline-app-registration'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Website Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Android Users',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Website Users',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'ID Registration Users',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Current Visits"
              chartData={[
                { label: 'District 1', value: 4344 },
                { label: 'District 2', value: 2344 },
                { label: 'District 3', value: 3344 },
                { label: 'District 4', value: 5344 },
                { label: 'District 5', value: 1344 },
                { label: 'District 6', value: 1344 },
              ]}
              chartColors={[
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    );
}