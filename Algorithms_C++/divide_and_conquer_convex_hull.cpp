#include "divide_and_conquer_convex_hull.h"
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int operation_count = 0;

int orientation(Point_DC p, Point_DC q, Point_DC r) {
    operation_count++;
    int val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) return 0; // collinear
    return (val > 0) ? 1 : 2; // clockwise or counterclockwise
}

// Global point used for sorting points with reference to the first point
Point_DC p0;

// Function to compare two points based on polar angle
bool compare(Point_DC p1, Point_DC p2) {
    // Find orientation
    operation_count++;
    int o = orientation(p0, p1, p2);
    if (o == 0)
        return (p1.x * p1.x + p1.y * p1.y) < (p2.x * p2.x + p2.y * p2.y); // Sort by distance
    return (o == 2); // Sort by counterclockwise angle
}

// Function to find the Convex Hull of a set of points using Divide and Conquer
vector<Point_DC> convexHull_DC(vector<Point_DC>& points) {
    int n = points.size();
    vector<Point_DC> hull;

    // Find the leftmost point
    int ymin = points[0].y, min = 0;
    operation_count++;
    for (int i = 1; i < n; i++) {
        operation_count++;
        int y = points[i].y;
        if ((y < ymin) || (ymin == y && points[i].x < points[min].x))
            ymin = points[i].y, min = i;
    }

    // Swap the leftmost point with the first point
    swap(points[0], points[min]);
    p0 = points[0];
    operation_count += 3; // For swap and assignment

    // Sort the remaining points based on polar angle
    sort(points.begin() + 1, points.end(), compare);

    // If two or more points have same angle, keep the farthest
    int m = 1;
    operation_count++;
    for (int i = 1; i < n; i++) {
        operation_count++;
        // Keep removing i while angle of i and i+1 is same with respect to p0
        while (i < n - 1 && orientation(p0, points[i], points[i + 1]) == 0) {
            operation_count++;
            i++;
        }
        points[m] = points[i];
        m++;
        operation_count += 2; // For assignment and increment
    }

    // If less than 3 points, convex hull is not possible
    if (m < 3) return hull;

    hull.push_back(points[0]);
    hull.push_back(points[1]);
    hull.push_back(points[2]);
    operation_count += 3; // For push_back operations

    // Process remaining points
    for (int i = 3; i < m; i++) {
        operation_count++;
        // Keep removing top while the angle formed by points[nextToTop(stack)], points[top(stack)], points[i] makes a non-left turn
        while (hull.size() >= 2 && orientation(hull[hull.size() - 2], hull[hull.size() - 1], points[i]) != 2) {
            operation_count++;
            hull.pop_back();
        }
        hull.push_back(points[i]);
        operation_count++;
    }

    return hull;
}

void displayConvexHull_DC(vector<Point_DC>& hull) {
    cout << "Convex Hull Points and Edges:\n";
    for (int i = 0; i < hull.size(); ++i) {
        cout << "(" << hull[i].x << ", " << hull[i].y << ")";
        if (i < hull.size() - 1)
            cout << " -> ";
    }
    if (hull.size() > 1)
        cout << " -> (" << hull[0].x << ", " << hull[0].y << ")";
    cout << endl;
}

int actualIterations_DC() {
    return operation_count;
}
