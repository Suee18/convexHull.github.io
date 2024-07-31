#pragma once
#include <vector>

using namespace std;

struct Point 
{
    int x, y;
    Point(int x = 0, int y = 0) : x(x), y(y) {}

    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }

    bool operator<(const Point& other) const {
        return x == other.x ? y < other.y : x < other.x;
    }
};

bool isLeftTurn(const Point& a, const Point& b, const Point& c);
bool isRightTurn(const Point& a, const Point& b, const Point& c);
vector<Point> bruteForceConvexHull(const vector<Point>& points);
void  printConvexHullPath(const vector<Point>& points);
int actualIterations_BF();

