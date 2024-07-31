
#include "convex_hull.h"
#include <algorithm>
#include <iostream>
using namespace std;

bool isLeftTurn(const Point& a, const Point& b, const Point& c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) > 0;
}

bool isRightTurn(const Point& a, const Point& b, const Point& c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x) < 0;
}
#include <iostream>
#include <vector>
#include <algorithm>
#include "convex_hull.h"
using namespace std;

int brute_force_operation_count = 0;

// Function to find the Convex Hull using Brute Force
vector<Point> bruteForceConvexHull(const vector<Point>& points) {
    vector<Point> hull;
    int n = points.size();

    if (n < 3) return hull;

    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            bool isHullEdge = true;
            bool hasPos = false, hasNeg = false;

            for (int k = 0; k < n; ++k) {
                if (k == i || k == j) continue;

                int orientation = (points[j].x - points[i].x) * (points[k].y - points[i].y) -
                    (points[j].y - points[i].y) * (points[k].x - points[i].x);
                brute_force_operation_count++; //it
                if (orientation > 0) hasPos = true;
                else if (orientation < 0) hasNeg = true;

                if (hasPos && hasNeg) {
                    isHullEdge = false;
                    break;
                }
            }

            if (isHullEdge) {
                hull.push_back(points[i]);
                hull.push_back(points[j]);
                brute_force_operation_count += 2; // For push_back iterations
            }
        }

        sort(hull.begin(), hull.end());
        hull.erase(unique(hull.begin(), hull.end()), hull.end());
        brute_force_operation_count += hull.size(); // For sort and unique iterations
    }

    // Sort hull points based on their polar angle from the lowest x and y point
    auto lowest = min_element(points.begin(), points.end());
    sort(hull.begin(), hull.end(), [lowest](const Point& a, const Point& b) {
        double angleA = atan2(a.y - lowest->y, a.x - lowest->x);
        double angleB = atan2(b.y - lowest->y, b.x - lowest->x);
        return angleA < angleB;
        });
    brute_force_operation_count += hull.size(); // sorting it 

    return hull;
}

int actualIterations_BF() {
    return brute_force_operation_count;
}

void printConvexHullPath(const vector<Point>& convexHull) {
    cout << "The Path of the Convex Hull:" << endl;
    for (size_t i = 0; i < convexHull.size(); ++i) {
        size_t nextIndex = (i + 1) % convexHull.size();
        cout << "(" << convexHull[i].x << " , " << convexHull[i].y << ")";
        cout << " -> ";
        cout << "(" << convexHull[nextIndex].x << " , " << convexHull[nextIndex].y << ")";
        if (i < convexHull.size() - 1)
            cout << endl;
    }
    cout << endl;
}


//
//
//// worst case 
//long long bruteForceComplexity(int n) {
//    return static_cast<long long>(n) * n * n / 2;
//}
//

