#ifndef DIVIDE_AND_CONQUER_CONVEX_HULL_H
#define DIVIDE_AND_CONQUER_CONVEX_HULL_H

#include <vector>
#include <iostream>
using namespace std;

struct Point_DC {
	int x, y;
};
int orientation(Point_DC p, Point_DC q, Point_DC r);
bool compare(Point_DC p1, Point_DC p2);
vector<Point_DC> convexHull_DC(vector<Point_DC>& points);
void displayConvexHull_DC(vector<Point_DC>& hull);
//COMPLEXITY
int actualIterations_DC();
#endif 
